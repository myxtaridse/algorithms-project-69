import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-unresolved': 'off',
    },
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, '@stylistic': stylistic },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
  {
    files: ['eslint.config.js'], 
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
]);
