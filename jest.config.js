/** @type {import('ts-jest').JestConfigWithTsJest} */
const { createViteJestPreset } = require('vite-jest/preset');

module.exports = {
  ...createViteJestPreset(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/__tests__/__mocks__/localStorageMock.js"],
  verbose: true,
  globals: {
    crypto: {
      getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
    },
    setupFiles: ["<rootDir>/__tests__/__mocks__/localStorageMock.js"],
    verbose: true,
    globals: {
      crypto: {
        getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
      },
    },
    modulePathIgnorePatterns: ["<rootDir>/__tests__/__mocks__/*", "<rootDir>/__tests__/__fixtures__/*"]
  }
}