let accessToken: string | null = null;

/**
 * Represents a storage mechanism for access token (JWT).
 * Provides methods to set, retrieve, and clear the token value.
 *
 * @interface TokenStore
 * @property set - Stores the given token and returns it.
 * @property get - Retrieves the currently stored token.
 * @property clear - Clears the stored token value.
 */
export interface TokenStore {
  set: (token: string) => string;
  get: () => string;
  clear: () => void;
}

// In-memory storage for JWT token. Alternative to React
// Context and too complex for this task - Redux, as it
// can leak into browser DevTools.
export const tokenStore: TokenStore = {
  set: (token: string): string => (accessToken = token),
  get: (): string => accessToken,
  clear: (): void => (accessToken = null),
};
