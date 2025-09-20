import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({ recommended: true });

export default [
  // Integra ESLint com Prettier
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:prettier/recommended'),

  {
    files: ['*.ts', '*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Regras Prettier
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2,
          trailingComma: 'es5',
          arrowParens: 'always',
          endOfLine: 'lf', // ⚠️ força LF
        },
      ],

      // Garantir LF para ESLint
      'linebreak-style': ['error', 'unix'],
    },
  },
];
