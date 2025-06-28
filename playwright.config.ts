import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  workers: 2,
  retries: 1,
  timeout: 30000,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['json', { outputFile: 'playwright-report/test-results.json' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } }
  ],

  globalSetup: require.resolve('./global/setup.ts'),
  globalTeardown: require.resolve('./global/teardown.ts'),
});
