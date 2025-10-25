const BASE_URL = process.env.BASE_URL;

const AUTH: string = `${BASE_URL}/auth`;
const API: string = `${BASE_URL}/api`;

export const URLMap: Map<string, string> = new Map<string, string>([
  ["register", `${AUTH}/register`],
  ["login", `${AUTH}/login`],
  ["refresh", `${AUTH}/refresh`],
  ["users", `${API}/users`],
]);
