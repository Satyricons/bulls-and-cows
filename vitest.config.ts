import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    globals: false,
    reporters: 'default',
    passWithNoTests: true, // Важно: позволяет проходить тестам, когда их еще нет
  },
});
