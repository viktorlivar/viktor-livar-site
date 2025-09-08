import base from '../../eslint.config.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';
import configPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  { ignores: ['**/cdk.out/**', 'eslint.config.*'] },

  ...base,

  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      globals: globals.node,
    },
  },

  configPrettier,
];
