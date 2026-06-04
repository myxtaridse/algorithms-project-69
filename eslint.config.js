import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  { 
    rules: { semi: ['error', 'always'] }, 
    files: ['**/*.{js,mjs,cjs}'], 
    plugins: { js, '@stylistic': stylistic }, 
    extends: ['js/recommended'], 
    languageOptions: { 
      globals: { ...globals.node, ...globals.jest } 
    } 
  },
]);
