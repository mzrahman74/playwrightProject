const { test, expect } = require("@playwright/test");

test("Browser Context-Validing Error login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".text-reset").click();
  await page.locator("#firstName").type("Mohammad");
  await page.locator("#lastName").type("Rahman");
  await page.locator("#userEmail").type("test@gmail.com");
  await page.locator("#userMobile").type("2139741111");
  const dropdown = page.locator("select.custom-select");
  await dropdown.selectOption("3: Engineer");
  // await page.pause();
  await page.locator('input[value="Male"]').click();
  await page.locator("#userPassword").type("Password1");
  await page.locator("#confirmPassword").type("Password1");
  await page.locator('input[type="checkbox"]').click();
  await page.locator('input[value="Register"]').click();
});

test("Browser context-validing error loing", async ({ page }) => {
  const cardTitle = page.locator(".card-body i");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("mrahmanz@yahoo.com");
  await page.locator("#userPassword").type("Psqrt1965?");
  await page.locator("input#login").click();
  await page.waitForLoadState("networkidle");
  console.log(await cardTitle.first().textContent());
  console.log(await cardTitle.nth(2).textContent());
  const AllTitles = await page.locator(".card-body b").allTextContents();
  console.log(AllTitles);
});
