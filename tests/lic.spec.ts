import { test, expect } from "@playwright/test";

test("Playwright special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByAltText("Success! The Form has been submitted successfully!.").isVisible();
});
