import { test as baseTest } from "@playwright/test";
interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}
export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
  testDataForOrder: {
    username: "mrahmanz@yahoo.com",
    password: "Psqrt1965?",
    productName: "ADIDAS ORIGINAL"
  }
});
