const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/placeholderTestData.json")));
for (const data of dataset) {
  test(`Client app login ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const india = " Country - India ";
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    await page.waitForLoadState("networkidle");
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartPage();
    await cartPage.navigateToCheckoutPage();
    await page.locator("[placeholder*='Country']").fill("ind", { delay: 100 });
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
    await page.locator("div.field.small input[type='text']").nth(0).fill("321");
    await page.locator("div.field.small input[type='text']").nth(1).fill("mohammad rahman");
    await expect(page.locator("text = mrahmanz@yahoo.com")).toHaveText(username);
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
}
