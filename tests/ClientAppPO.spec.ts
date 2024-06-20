import { test, expect } from "@playwright/test";
import { customTest } from "../utils_ts/test-base";
import { POManager } from "../pageObjects_ts/POManager";

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
    await ordersReviewPage.VerifyEmailId("mrahmanz@yahoo.com");
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
customTest(`Client app login`, async ({ page, testDataForOrder }) => {
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
