module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'arrow-parens': 'off',
    eqeqeq: 'error',
    'function-paren-newline': 'off',
    indent: ['error', 2],
    'linebreak-style': [2, 'unix'],
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
      },
    ],
    'no-duplicate-imports': 'error',
    'no-extra-parens': 'error',
    'no-return-await': 'error',
    'no-shadow': [
      'warn',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: [],
      },
    ],
    'operator-linebreak': [2, 'before', { overrides: { '?': 'after' } }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
