import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { DateTime } from 'luxon';
import { AuthData, Envars } from '../../types';
import { getMostRecentInstall } from '../authData/getMostRecent';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { refreshAuthToken } from '../apiRequests';
import { updateDb } from '../db';

/**
 * An axios interceptor that will refresh the auth token
 * using the refresh token when the auth token expires
 * @param {InternalAxiosRequestConfig} request that can be used in the interceptor
 * for conditional checks
 * @returns Axios request interceptor
 */
export async function refreshTokenReqInterceptor(
  request: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  // Read the latest data(auth token, refresh token and expiry)
  const data = await getMostRecentInstall();
  // If no data then continue with the request
  if (!data) return request;
  // Data used to calculate the expiry
  const expiresIn = data.expires_in;
  const createdDate = data.date;
  // Used npm library luxon to parse the date and calculate expiry
  const parsedCreateDate = DateTime.fromISO(createdDate.toString());
  const expirationDate = parsedCreateDate.plus({ seconds: expiresIn });
  // Check if expired
  if (expirationDate < DateTime.now()) {
    await refreshAndUpdateDb(data);
  }
  return request;
}

export async function refreshTokenRespInterceptor(error: AxiosError): Promise<AxiosError> {
  const status = error.response ? error.response.status : null;

  // Only refresh & retry the token on 401 Unauthorized, in case the access-token is
  //  invalidated before it expires, such as the signing key being rotated in an emergency.
  if (status === 401) {
    // Read the latest data(auth token, refresh token and expiry)
    const data = await getMostRecentInstall();
    // If no data or config then fail the retry
    if (!data || error.config === undefined) return Promise.reject(error);

    const newAccessToken = await refreshAndUpdateDb(data);

    // Use the new access token to retry the failed request
    error.config.headers['Authorization'] = `${data.token_type} ${newAccessToken}`;
    return axios.request(error.config);
  }

  return Promise.reject(error);
}

/**
 * Refreshes the access-token for a given DB record, and updates the DB again
 * @param {AuthData} data database entry with authentication info
 * @returns string Newly refreshed access-token
 */
async function refreshAndUpdateDb(data: AuthData): Promise<string> {
  // Create a instance for encryption and decryption
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  // Make request to refresh token
  const { access_token, expires_in, refresh_token, scope, token_type } = await refreshAuthToken(
    eD.decryptString(data.refresh_token),
  );
  // Update the access and refresh token with the newly fetched access and refresh token
  // along with the expiry and other required info
  await updateDb(data, {
    ...data,
    access_token: eD.encryptString(access_token),
    expires_in,
    refresh_token: eD.encryptString(refresh_token),
    token_type,
    scope,
    date: new Date(),
  });

  return access_token;
}
