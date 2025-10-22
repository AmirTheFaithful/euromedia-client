import type { AxiosResponse } from "axios";
import type { TokenResponse } from "@/types/api.types";

export interface LoginData {
  email: string;
  password: string;
}

export interface AccessTokenPayload {
  id: string;
}

export type LoginResponse = AxiosResponse<TokenResponse>;
