import { defineConfig } from '@playwright/test';

const baseURL = 'http://localhost:3000';

export default defineConfig({
  testDir: 'e2e',
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  webServer: {
    command: 'pnpm start:prod',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  // Uses the installed Google Chrome, which CI runners ship too, instead of downloading Playwright's Chromium.
  projects: [
    { name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } },
  ],
});
