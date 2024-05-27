const { test, expect } = require("@playwright/test");

test("page titel", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(page.title);
  await expect(page).toHaveTitle("Google");
});

test("webapp title & screenshot", async ({ page }) => {
  await page.goto("https://webgopros.com");
  console.log(page.title);
  await expect(page).toHaveURL("https://webgopros.com");
  await expect(page.locator("#id-footer")).toBeVisible();
  await expect(page.locator('footer[id="id-footer" ] p')).toBeVisible();
});

test("web confirm about page assertion", async ({ page }) => {
  await page.goto("https://webgopros.com");
  await page.locator('a[href="/about"]').click();
  await expect(page.locator("img.profile")).toBeVisible();
  await expect(page.locator("#id-footer")).toBeVisible();
  await expect(page.locator('footer[id="id-footer" ] p')).toBeVisible();
});

test("web confirm contact page assertion", async ({ page }) => {
  await page.goto("https://webgopros.com");
  await page.locator('a[href="/contact"]').click();
  await expect(page.locator("img.contact_me")).toBeVisible();
  await expect(page.locator("#note-id-2nd")).toHaveAttribute("class", "note");
  await expect(page.locator("#note-id-3rd")).toBeVisible();
  await expect(page.locator("#id-footer")).toBeVisible();
  await expect(page.locator('footer[id="id-footer" ] p')).toBeVisible();
});
