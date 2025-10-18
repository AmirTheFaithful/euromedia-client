import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from "axios";
import axios from "axios";

import { api } from "./axiosInstance";
import { URLMap } from "@/utils/urls";
import { TokenResponse } from "@/types/api.types";
import { tokenStore } from "@/utils/tokenStore";

// Retrieve access token header flag.
const HEADER: string = import.meta.env.VITE_ACS_TKN_HDR;

export const sendAccessTokenInterceptor = (): AxiosInstance => {
  // Just retrieves the token from the in-memory store and passes it into
  // request X-access-token header.
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = tokenStore.get();
    if (token) {
      config.headers[HEADER] = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const useRefreshInterceptor = (): AxiosInstance => {
  // If access token is fine - send regulare response,
  // otherwise - handle refresh token logic.
  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      // If response status is Unauthorized - perform refresh-token scenario:
      if (error.response.status === 401) {
        try {
          // Receive new, refreshed access token.
          const TokenResponse: AxiosResponse<TokenResponse> = await axios.post(
            URLMap.get("refresh")
          );
          // Retrieve fresh token from response body.
          const newAccessToken: string = TokenResponse.data.accessToken;
          // Save the token into in-memory store.
          tokenStore.set(newAccessToken);
          // Configure custom header for future requests where access token would be needed.
          error.config.headers[HEADER] = `Bearer ${newAccessToken}`;

          return api.request(error.config);
          // If something went wrong or refresh
          // token has been expired
          // - clear tokenStore and relocate user
          // to the login page to let user retrieve
          // new access token and scenario.
        } catch (error: unknown) {
          tokenStore.clear();
          window.location.href = "/signin";
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
