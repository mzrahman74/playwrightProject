class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderDetails = page.locator("div.col-text");
    this.ordersView = page.locator("button:has-text('View')");
  }
  async searchOrderAndSelect(orderId) {
    await this.ordersTable.waitFor();
    const tableRow = await this.rows;
    for (let i = 0; i < (await tableRow.count()); i++) {
      const rowOrderId = await tableRow.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await tableRow.nth(i).this.ordersView.click();
        break;
      }
    }
  }
  async getOrderId() {
    return await this.orderDetails.textContent();
  }
}
module.exports = { OrdersHistoryPage };
