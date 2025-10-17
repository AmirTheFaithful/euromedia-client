const AUTH: string = `${import.meta.env.VITE_BASE_URL}/auth`;

export const URLMap: Map<string, string> = new Map<string, string>([
  ["register", `${AUTH}/register`],
  ["login", `${AUTH}/login`],
  ["refresh", `${AUTH}/refresh`],
]);
