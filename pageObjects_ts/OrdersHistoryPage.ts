import { expect, type Locator, type Page } from "@playwright/test";
export class OrdersHistoryPage {
  page: Page;
  ordersTable: Locator;
  rows: Locator;
  orderDetails: Locator;
  ordersView: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderDetails = page.locator("div.col-text");
    this.ordersView = page.locator("button:has-text('View')");
  }
  async searchOrderAndSelect(orderId: any) {
    await this.ordersTable.waitFor();
    const tableRow: any = this.rows;
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
