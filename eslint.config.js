import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'writable',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      react: 'plugin:react/recommended',
      '@typescript-eslint': '@typescript-eslint/eslint-plugin',
      'simple-import-sort': 'plugin:simple-import-sort/recommended',
      'import-helpers': 'plugin:import-helpers/recommended',
      'unused-imports': 'plugin:unused-imports',
      'jsx-a11y': 'plugin:jsx-a11y/recommended',
      'import': 'plugin:import/recommended',
      'react-hooks': 'plugin:react-hooks/recommended',
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/'],
            ['^\\u0000'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          groups: [
            ['/^react/', '/^@/'],
            ['/^components/', '/^hooks/', '/^services/', '/^utils/'],
            ['/^styles/'],
            ['/^types/'],
          ],
        },
      ],
      'unused-imports/no-unused-imports-ts': 'error',
      'jsx-a11y/no-onchange': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
