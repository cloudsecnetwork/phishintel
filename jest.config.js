export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}', 
    '!**/node_modules/**',
    '!**/client/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/jest.config.js',
    '!**/app.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/', 
    '/build/',
    '/client/',
    '/dist/',
    '/coverage/'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 30000,
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.js'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};