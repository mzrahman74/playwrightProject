const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");

test("Client app login", async ({ page }) => {
  const products = page.locator(".card-body");
  const cardTitle = page.locator(".card-body b");
  const loginPage = new LoginPage(page);
  const username = "mrahmanz@yahoo.com";
  const password = "Psqrt1965?";
  const india = " Country - India ";
  const productName = "adidas original";
  loginPage.goTo();
  loginPage.validLogin(username, password);
  await page.waitForLoadState("networkidle");
  console.log(await cardTitle.first().textContent());
  console.log(await cardTitle.nth(2).textContent());
  const AllTitles = await page.locator(".card-body b").allTextContents();
  console.log(AllTitles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('adidas original')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("button[type='button']").nth(1).click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator(".payment__cc input[class*='text-validated']").fill("");
  await page.locator(".payment__cc input[class*='text-validated']").fill("47898521455631478");
  await page.locator("select.input").first().selectOption("04");
  await page.locator("select.input").last().selectOption("24");
  await page.locator("div.field.small input[type='text']").nth(0).type("321");
  await page.locator("div.field.small input[type='text']").nth(1).type("mohammad rahman");
  await expect(page.locator("text = mrahmanz@yahoo.com ")).toHaveText(username);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const tableRow = page.locator("tbody tr");
  for (let i = 0; i < (await tableRow.count()); i++) {
    const rowOrderId = await tableRow.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await tableRow.nth(i).locator("button:has-text('View')").click();
      break;
    }
  }
  const orderDetail = await page.locator("div.col-text").textContent();
  expect(orderId.includes(orderDetail)).toBeTruthy();
});
