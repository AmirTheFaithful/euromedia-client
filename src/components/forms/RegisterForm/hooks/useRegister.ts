import { useCallback } from "react";
import { isAxiosError } from "axios";

import type { RegisterData } from "../types";
import { api } from "@/api/axiosInstance";
import { URLMap } from "@/utils/urls";

export const useRegister = () => {
  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await api.post(URLMap.get("register"), data);

      // If server's response is positive - just exit from the hook.
      if (
        response.status === 201 &&
        response.data.message === "Register success."
      )
        // Quit, as negative responses could be handled below.
        return;
    } catch (error: unknown) {
      let serverMessage: string;

      if (isAxiosError(error) && error.response)
        serverMessage = error.response.data.message;

      throw new Error(serverMessage ?? "Unknown network error.");
    }
  }, []);

  return { register };
};
