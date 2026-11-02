import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/server/**/*.spec.ts', 'test/**/*.spec.ts'],
  },
});
