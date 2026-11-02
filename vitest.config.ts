import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { defineConfig } from 'vitest/config';

// Tests drop the schema, so .env.test wins over a DATABASE_URL already exported in the shell.
Object.assign(process.env, parseEnv(readFileSync('.env.test', 'utf8')));

export default defineConfig({
  test: {
    include: ['src/server/**/*.spec.ts', 'test/**/*.spec.ts'],
    fileParallelism: false,
  },
});
