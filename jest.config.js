import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "\\.module\\.(css|scss)$": "identity-obj-proxy",
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.svg(\\?react)?$": "<rootDir>/src/__mocks__/svgMock.js",
    "\\.(jpg|jpeg|png|webp|gif)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
