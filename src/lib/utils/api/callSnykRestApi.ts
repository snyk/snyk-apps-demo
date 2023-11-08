import axios, { AxiosInstance } from 'axios';
import { API } from '../../types';
import { API_BASE } from '../../../app';
import { refreshTokenReqInterceptor, refreshTokenRespInterceptor } from './interceptors';

/**
 * Utility function to call the Snyk REST API
 * @param {String} tokenType ex: bearer, token, etc
 * @param {String} token authentication token
 * @see {@link https://apidocs.snyk.io/ REST API Docs}
 * @returns {AxiosInstance}
 */
export function callSnykRestApi(tokenType: string, token: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `${API_BASE}/${API.REST}`,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `${tokenType} ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(refreshTokenReqInterceptor, Promise.reject);
  axiosInstance.interceptors.response.use((response) => response, refreshTokenRespInterceptor);

  return axiosInstance;
}
