import { expect, type Locator, type Page } from "@playwright/test";

export class OrdersReviewPage {
  page: Page;
  country: Locator;
  dropdown: Locator;
  inputCardInfo: Locator;
  inputMonthYear: Locator;
  inputCvcAndName: Locator;
  emailId: Locator;
  submit: Locator;
  orderConfirmationText: Locator;
  orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.inputCardInfo = page.locator(".payment__cc input[class*='text-validated']");
    this.inputMonthYear = page.locator("select.input");
    this.inputCvcAndName = page.locator("div.field.small input[type='text']");
    this.emailId = page.locator("text = mrahmanz@yahoo.com");
    this.submit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.country.type(countryCode, { delay: 1000 });
    const dropdown = this.dropdown;
    await this.dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      const text: any = await dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async inputCardInformation() {
    await this.inputCardInfo.fill("");
    await this.inputCardInfo.fill("47898521455631478");
    await this.inputMonthYear.first().selectOption("04");
    await this.inputMonthYear.last().selectOption("24");
    await this.inputCvcAndName.nth(0).fill("321");
    await this.inputCvcAndName.nth(1).fill("mohammad rahman");
  }

  async VerifyEmailId(username: string) {
    await expect(this.emailId).toHaveText(username);
  }

  async SubmitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    return await this.orderId.textContent();
  }
}

module.exports = { OrdersReviewPage };
