import baseConfig from '../../eslint.config.mjs';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
