import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // parallel executions
  fullyParallel: true,

  // report HTML
  reporter: 'html',

  use: {
    // baseURL
    baseURL: 'https://www.saucedemo.com',

    trace: 'on-first-retry',
  },

  // 2 browsers: Chromium + Firefox
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});