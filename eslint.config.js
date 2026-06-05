import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'jest';

export default defineConfig([
  {
    ignores: ['eslint.config.js'],
    rules: {
      '@stylistic/semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, '@stylistic': stylistic },
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
]);
