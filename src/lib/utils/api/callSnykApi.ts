import axios, { AxiosInstance } from 'axios';
import { API } from '../../types';
import { API_BASE } from '../../../app';
import { refreshTokenReqInterceptor, refreshTokenRespInterceptor } from './interceptors';

/**
 * Utility function to call the Snyk V1 API
 * @param {String} tokenType ex: bearer, token, etc
 * @param {String} token authentication token
 * @returns {AxiosInstance}
 * @see {@link https://snyk.docs.apiary.io/ V1 API Docs}
 */
export function callSnykApi(tokenType: string, token: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `${API_BASE}/${API.V1}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(refreshTokenReqInterceptor, Promise.reject);
  axiosInstance.interceptors.response.use((response) => response, refreshTokenRespInterceptor);

  return axiosInstance;
}
