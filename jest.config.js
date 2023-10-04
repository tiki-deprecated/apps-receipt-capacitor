/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  automock: true,
  globals: {
    crypto: {
    getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
    },
    
  },
};