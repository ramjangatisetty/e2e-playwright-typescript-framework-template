import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 2,
  retries: 1,
  timeout: 30000,
  reporter: [['list'],['allure-playwright'],['html', { open: 'never' }]], 
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' }}
  ],
});
