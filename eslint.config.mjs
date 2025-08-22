import js from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.cache/**'],
  },

  {
    files: ['**/*.config.mjs', '**/eslint.config.mjs'],
    languageOptions: { sourceType: 'module' },
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },

      globals: globals.node,
    },
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.node,
    },
    plugins: { prettier: eslintPluginPrettier },
    rules: { 'prettier/prettier': 'warn' },
  },

  {
    files: ['**/*.config.*', '**/.prettierrc.*', 'eslint.config.*'],
    languageOptions: { sourceType: 'script', globals: globals.node },
    rules: { '@typescript-eslint/await-thenable': 'off' },
  },

  configPrettier,
);
