import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/__tests__"],
  testMatch: ["**/*.test.ts", "!**/*.e2e.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  coverageDirectory: "coverage",
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
};

export default config;
