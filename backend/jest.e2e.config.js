module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.e2e.ts'],
  setupFiles: ['dotenv/config'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  globalSetup: '<rootDir>/test/globalSetup.js',
  globalTeardown: '<rootDir>/test/globalTeardown.js',
};