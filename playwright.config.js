// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "on",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        ...devices["iphone 11"]
      }
    },
    {
      name: "chrome execution",
      use: {
        browserName: "chromium",
        use: { name: "chromium", headless: true, screenshot: "on", trace: "retain-on-failure" }
      }
    },
    {
      name: "firefox execution",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "on",
        trace: "on"
      }
    }
  ]

  /* Configure projects for major browsers */

  // {
  //   name: "firefox",
  //   use: { ...devices["Desktop Firefox"] }
  // },

  // {
  //   name: "webkit",
  //   use: { ...devices["Desktop Safari"] }
  // }

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { channel: 'chrome' },
  // },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
