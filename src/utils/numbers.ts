export const normalizeZero = (n: number) => (Object.is(n, -0) ? 0 : n);
