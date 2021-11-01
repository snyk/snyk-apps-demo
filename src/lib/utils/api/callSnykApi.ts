import axios, { AxiosInstance  } from 'axios';
import { APIVersion} from '../../types';
import { API_BASE } from '../../../app';
import { refreshTokenReqInterceptor, refreshTokenRespInterceptor } from '.';

/**
 * Utility function to call the Snyk API
 * @param {String} tokenType ex: bearer, token, etc
 * @param {String} token authentication token
 * @param {APIVersion} version API version to call, defaults to V1
 * @returns {AxiosInstance}
 */
export function callSnykApi(tokenType: string, token: string, version: APIVersion = APIVersion.V1): AxiosInstance {
  // Snyk instance for API V1
  let axiosInstance = axios.create({
    baseURL: `${API_BASE}/v1`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${token}`,
    },
  });

  // If user selection V3
  if (version === APIVersion.V3) {
    axiosInstance = axios.create({
      baseURL: `${API_BASE}/v3`,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: `${tokenType} ${token}`,
      },
    });
  }

  axiosInstance.interceptors.request.use(refreshTokenReqInterceptor, Promise.reject);
  axiosInstance.interceptors.response.use(response => response, refreshTokenRespInterceptor);

  return axiosInstance;
}
