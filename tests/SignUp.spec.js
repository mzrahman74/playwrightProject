const { test, expect } = require("@playwright/test");
test("account sign up", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".text-reset").click();
  await page.locator("#firstName").fill("Mohammad");
  await page.locator("#lastName").fill("Rahman");
  await page.locator("#userEmail").fill("test@gmail.com");
  await page.locator("#userMobile").fill("2139741111");
  const dropdown = page.locator("select.custom-select");
  await dropdown.selectOption("3: Engineer");
  // await page.pause();
  await page.locator('input[value="Male"]').click();
  await page.locator("#userPassword").fill("Password1");
  await page.locator("#confirmPassword").fill("Password1");
  await page.locator('input[type="checkbox"]').click();
  await page.locator('input[value="Register"]').click();
});
