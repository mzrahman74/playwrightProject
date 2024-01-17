class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cardTitle = page.locator(".card-body b");
    this.cart = page.locator('[routerlink*="cart"]');
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName) {
    const AllTitles = await this.cardTitle.allTextContents();
    console.log(AllTitles);
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToOrders() {
    await this.orders.click();
  }
  async navigateToCart() {
    await this.cart.click();
  }
}

module.exports = { DashboardPage };
