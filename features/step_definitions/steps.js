const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");

Given("a login to Ecommerce application with {string} and {string}", { timeout: 100 * 1000 }, async function (username, password) {
  const products = this.page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When("Add {string} to cart", async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the cart", { timeout: 100 * 1000 }, async function (string) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.verifyCartPage();
  await cartPage.navigateToCheckoutPage();
});

When("Enter valid details and place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  await ordersReviewPage.inputCardInfo();
  await ordersReviewPage.VerifyEmailId();
  await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
});

Then("Verify order in present in the orderHistory", async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchCountryAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
