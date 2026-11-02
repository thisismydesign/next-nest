import { defineConfig } from 'vitest/config';

process.loadEnvFile('.env.test');

export default defineConfig({
  test: {
    include: ['src/server/**/*.spec.ts', 'test/**/*.spec.ts'],
    fileParallelism: false,
  },
});
