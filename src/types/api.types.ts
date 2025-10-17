/**
 * Represents the payload of a token response returned by the login or refresh APIs.
 *
 * @property accessToken - The access token used to authorize subsequent API requests.
 */
export interface TokenResponse {
  accessToken: string;
}
