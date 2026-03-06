import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/__tests__"],
  testMatch: ["**/e2e/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/e2e/setup.ts"],
  coverageDirectory: "coverage/e2e",
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/"],
  testTimeout: 30000,
  globalSetup: undefined,
  globalTeardown: undefined,
};

export default config;
