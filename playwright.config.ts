import { LaunchOptions, defineConfig, devices } from '@playwright/test';

export const config: LaunchOptions = {
  timeout: 30 * 1000,
  headless: process.env.CI ? true : false,
  slowMo: 600,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process', '--disable-site-isolation-trials'],
  tracesDir: 'test-result/traces'
};

export default defineConfig({
  retries: 3,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
});

