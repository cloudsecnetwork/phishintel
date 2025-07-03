module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'client/build/',
    'coverage/',
    '*.config.js',
  ],
};
