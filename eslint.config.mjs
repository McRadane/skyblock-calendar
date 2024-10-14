import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarnPlugin from 'eslint-plugin-only-warn';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
// import sonarjsPlugin from "eslint-plugin-sonarjs";
import webPlugin from 'eslint-plugin-web';
import path from 'path';
import typescriptPlugin from 'typescript-eslint';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const config = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['src/assets/**', 'public/**'],
    name: 'Global Include and Ignore',
    plugins: { 'only-warn': onlyWarnPlugin }
  },
  {
    name: 'ESLint Recommended',
    ...eslint.configs.recommended
  },
  ...typescriptPlugin.configs.recommended,
  {
    name: 'Web Plugin',
    plugins: {
      web: webPlugin
    },
    rules: webPlugin.configs.all.rules
  },
  ...compat.extends('plugin:import/typescript'),
  {
    name: 'Perfecionist plugin',
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      ...perfectionistPlugin.configs['recommended-natural'].rules
    }
  },
  /*
  Eslint Sonar Plugin is currently not compatible with eslint 8
  {
    name: "SonarLint Plugin",
    plugins: {
      sonarjs: sonarjsPlugin,
    },
    rules: sonarjsPlugin.configs.recommended.rules,
  },*/
  {
    name: 'Rules',

    rules: {
      'no-console': 'warn'
    }
  },
  eslintConfigPrettier
];

export default config;
