const { test, expect } = require("@playwright/test");

test("page titel", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(page.title);
  await expect(page).toHaveTitle("Google");
});
