module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'lodash', 'jest'],
  rules: {
    'react/prop-types': 0,
    'no-use-before-define': 'off',

    // tree shake lodash
    'lodash/import-scope': [2, 'method']
  },
  globals: {
    ThemeInterface: true
  }
};
