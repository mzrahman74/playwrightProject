const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");
const loginPayLoad = { userEmail: "mrahmanz@yahoo.com", userPassword: "Psqrt1965?" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Login and purchase", async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const tableRow = page.locator("tbody tr");
  for (let i = 0; i < (await tableRow.count()); i++) {
    const rowOrderId = await tableRow.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await tableRow.nth(i).locator("button:has-text('View')").click();
      break;
    }
  }
  const orderDetail = await page.locator("div.col-text").textContent();
  expect(response.orderId.includes(orderDetail)).toBeTruthy();
});
