const { test, expect } = require("@playwright/test");

test("First playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //page.route("**/*.{jpg,png,jpg}", route => route.abort());
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on("request", request => console.log(request.url()));
  page.on("response", response => console.log(response.url(), response.status()));
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await userName.type("rahulshetty");
  await password.type("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  // type fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  // race condition
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Ally application lauch", async ({ page }) => {
  await page.goto("https://alle.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Allē - A loyalty program uniquely designed for you.");
  await page.locator('[data-testid="header-login-link"]').click();
  await expect(page).toHaveURL(/.*login/);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*=documents-request]");
  await dropdown.selectText("Consultant");
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  /**
   * await depends on action
   */
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});
test.only("Child windows open", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*=documents-request]");

  const [newPage, newPage1] = await Promise.all([context.waitForEvent("page"), documentLink.click()]);
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(text);
  console.log(domain);
  await page.pause();
  await userName.type(domain);
  console.log(await userName.textContent());
});
