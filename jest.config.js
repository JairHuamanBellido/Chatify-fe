const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    // "^aws-amplify$": require.resolve("aws-amplify"),
    "^uuid$": require.resolve('uuid')

  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
  ],

};

module.exports = createJestConfig(config);
