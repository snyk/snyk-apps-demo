import axios, { AxiosInstance } from 'axios';
import { APIVersion } from '../../types';
import { API_BASE } from '../../../app';
import { refreshTokenReqInterceptor, refreshTokenRespInterceptor } from './interceptors';

/**
 * Utility function to call the Snyk API
 * @param {String} tokenType ex: bearer, token, etc
 * @param {String} token authentication token
 * @param {APIVersion} version API version to call
 * @returns {AxiosInstance}
 */
export function callSnykApi(tokenType: string, token: string, version: APIVersion): AxiosInstance {
  const contentType = version === APIVersion.V1 ? 'application/json' : 'application/vnd.api+json';

  const axiosInstance = axios.create({
    baseURL: `${API_BASE}/${version}`,
    headers: {
      'Content-Type': contentType,
      Authorization: `${tokenType} ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(refreshTokenReqInterceptor, Promise.reject);
  axiosInstance.interceptors.response.use((response) => response, refreshTokenRespInterceptor);

  return axiosInstance;
}
