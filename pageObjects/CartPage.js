const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.listItem = page.locator("div li");
    this.selectedProduct = page.locator("h3:has-text('adidas original')");
    this.checkout = page.locator("button[type='button']");
  }

  async verifyCartPage() {
    await this.listItem.first().waitFor();
    const bool = await this.selectedProduct.isVisible();
    expect(bool).toBeTruthy();
  }

  async navigateToCheckoutPage() {
    await this.checkout.nth(1).click();
  }
}

module.exports = { CartPage };
