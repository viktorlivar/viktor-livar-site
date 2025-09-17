import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import base from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Only Next’s React rules; TypeScript comes from the base config
const nextCompat = compat.extends('next/core-web-vitals').map((c) => ({
  ...c,
  settings: {
    ...(c.settings ?? {}),
    next: { ...(c.settings?.next ?? {}), rootDir: __dirname },
  },
}));

const config = [
  { ignores: ['**/.next/**', '**/out/**', '**/_next/**'] },

  ...nextCompat,

  ...base,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
];

export default config;
