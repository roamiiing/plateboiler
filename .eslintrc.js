module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // no-unused-vars is triggered on interface methods
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',

    // import/extensions is triggered on importing .ts files
    'import/extensions': 'off',

    // no-shadow is triggered on declaring enums
    '@typescript-eslint/no-shadow': 'error',
    'no-shadow': 'off',

    // no-redeclare is triggered on declaring overloads
    '@typescript-eslint/no-redeclare': 'error',
    'no-redeclare': 'off',

    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts'],
    }],

    // because this is my code style
    'import/prefer-default-export': 'off',

    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
      },
    },
  },
};
