const { test, expect } = require("@playwright/test");
const { customtest } = require("../utils/test-base");
const { POManager } = require("../pageObjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/placeholderTestData.json")));
for (const data of dataset) {
  test(`Client app login ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    await page.waitForLoadState("networkidle");
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartPage();
    await cartPage.navigateToCheckoutPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await ordersReviewPage.inputCardInformation();
    await ordersReviewPage.VerifyEmailId();
    await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchCountryAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
customtest(`Client app login`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  await page.waitForLoadState("networkidle");
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  const cartPage = poManager.getCartPage();
  await cartPage.verifyCartPage();
  await cartPage.navigateToCheckoutPage();
});
