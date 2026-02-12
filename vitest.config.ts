import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './'),
      components: path.resolve(import.meta.dirname, './components'),
      hooks: path.resolve(import.meta.dirname, './hooks'),
      lib: path.resolve(import.meta.dirname, './lib'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
