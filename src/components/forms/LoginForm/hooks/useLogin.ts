import { useCallback } from "react";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

import type { User } from "@/types/user.types";
import type { LoginData, AccessTokenPayload, LoginResponse } from "../types";
import { NotFoundError, UnauthorizedError } from "@/errors/http.errors";

import { URLMap } from "@/utils/urls";
import { api } from "@/api/axiosInstance";
import { tokenStore } from "@/utils/tokenStore";
import { useAppDispatch } from "@/app/hooks";
import { setCurrentUser } from "@/features/user/user.slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const decodeUserID = (token: string): string => {
    // Retrieve user ID and return it.
    const payload = jwtDecode<AccessTokenPayload>(token);

    if (!payload) {
      throw new UnauthorizedError("Unable to decode token.");
    }

    const userID: string = payload.id;
    return userID;
  };

  const fetchUser = useCallback(
    async (id: string): Promise<User | undefined> => {
      try {
        const queryURL: string = `?id=${id}`;
        const response = await api.get(URLMap.get("users") + queryURL);

        if (response.status === 404)
          throw new NotFoundError("User not found by provided ID.");

        const user: User = response.data.data;
        return user;
      } catch (error: unknown) {
        throw new NotFoundError();
      }
    },
    []
  );

  const storeUser = async (response: LoginResponse): Promise<void> => {
    // Receive fresh access token from login.
    const accessToken: string = response.data.accessToken;
    // Store it in-memory.
    tokenStore.set(accessToken);
    // Decode user ID from the token.
    const userID: string = decodeUserID(accessToken);
    // Fetch the user by ID.
    const user = await fetchUser(userID);

    // Store fetched user as current user into global store.
    dispatch(setCurrentUser(user));
  };

  const login = useCallback(
    async (data: LoginData) => {
      try {
        const response: LoginResponse = await api.post(
          URLMap.get("login"),
          data,
          {
            withCredentials: true,
          }
        );

        // Render a notification with a timer and resend-button.
        if (response.status === 200) {
          await storeUser(response);
        }
      } catch (error: unknown) {
        let serverMessage: string;

        if (isAxiosError(error) && error.response)
          serverMessage = error.response.data.message;

        // Throw abstract Error instance with backend's or default message.
        throw new Error(serverMessage ?? "Unknown network error.");
      }
    },
    [dispatch, fetchUser]
  );

  return { login };
};
