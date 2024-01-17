const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
const loginPayLoad = { userEmail: "mrahmanz@yahoo.com", userPassword: "Psqrt1965?" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };
const fakePayload = { data: [], message: "No Product in Cart" };

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
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64010f18568c3e9fb126c45c", async route => {
    const response = await page.request.fetch(route.request());
    let body = fakePayload;
    route.fulfill({
      response,
      body
    });
    // intercepting response - API response -> {playwright fakeresponse}
  });
  await page.locator("button[routerlink*='myorders']").click();
  console.log(await page.locator(".mt-4").textContent());
});
