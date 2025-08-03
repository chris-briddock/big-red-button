module.exports = {
  extends: [
    'expo',
  ],
  env: {
    jest: true,
  },
  rules: {
    // General code quality
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'coverage/',
    '*.config.js',
  ],
};
