import base from '../../eslint.config.mjs';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';

import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const nextCompat = compat.extends('next/core-web-vitals', 'next/typescript').map((c) => {
  const { plugins, settings, ...rest } = c;

  const prunedPlugins =
    plugins && typeof plugins === 'object'
      ? Object.fromEntries(
          Object.entries(plugins).filter(([name]) => name !== '@typescript-eslint'),
        )
      : undefined;

  return {
    ...rest,
    ...(prunedPlugins && Object.keys(prunedPlugins).length ? { plugins: prunedPlugins } : {}),
    settings: { ...(settings ?? {}), next: { ...(settings?.next ?? {}), rootDir: __dirname } },
  };
});

const patchedBase = base.map((c) => {
  const touchesTS = c.files?.some((f) => f.includes('{ts,tsx}'));
  const touchesJS = c.files?.some((f) => f.includes('{js,jsx}'));

  const { plugins, ...rest } = c;
  const keptPlugins =
    plugins && typeof plugins === 'object'
      ? Object.fromEntries(
          Object.entries(plugins).filter(([name]) => name !== '@typescript-eslint'),
        )
      : undefined;

  const withEnv =
    touchesTS || touchesJS
      ? {
          ...rest,
          languageOptions: {
            ...rest.languageOptions,
            parserOptions: {
              ...rest.languageOptions?.parserOptions,
              tsconfigRootDir: __dirname,
              projectService: true,
            },
            globals: {
              ...(rest.languageOptions?.globals ?? {}),
              ...globals.browser,
              ...globals.node,
            },
          },
        }
      : rest;

  return keptPlugins && Object.keys(keptPlugins).length
    ? { ...withEnv, plugins: keptPlugins }
    : withEnv;
});

const config = [
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    settings: { next: { rootDir: __dirname } },
  },

  { ignores: ['**/.next/**', '**/out/**', '**/_next/**'] },

  ...nextCompat,

  ...patchedBase,
];

export default config;
