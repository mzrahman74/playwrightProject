class LoginPge {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator("input#login");
    this.userName = page.locator("#userEmail").fill(email);
    this.password = page.locator("#userPassword").type("Psqrt1965?");
  }
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInbutton.click();
  }
}

module.export = { LoginPge };
