import type { AxiosRequestConfig } from 'axios';
import { Envars } from '../../types';
import { DateTime } from 'luxon';
import { readFromDb } from '../db';
import { mostRecent } from '../../controllers/projects/projectsHandlers';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { refreshAuthToken } from '../apiRequests';
import { updateDb } from '../db';

/**
 * An axios interceptor that will refresh the auth token
 * using the refresh token when the auth token expires
 * @param {AxiosRequestConfig} request that can be used in the interceptor
 * for conditional checks
 * @returns Axios request interceptor
 */
export async function refreshTokenInterceptor(request: AxiosRequestConfig) {
  // Read the latest data(auth token, refresh token and expiry)
  const db = await readFromDb();
  const data = mostRecent(db.installs);
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
    // Create a instance for encryption and decryption
    const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
    // Make request to refresh token
    const { access_token, expires_in, refresh_token, scope, token_type } = await refreshAuthToken(
      eD.decryptString(data.refresh_token),
    );
    // Update the acess and refresh token with the newly fetched access and refresh token
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
  }
  return request;
}
