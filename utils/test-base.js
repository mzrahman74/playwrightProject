const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "mrahmanz@yahoo.com",
    password: "Psqrt1965?",
    productName: "ADIDAS ORIGINAL"
  }
});
