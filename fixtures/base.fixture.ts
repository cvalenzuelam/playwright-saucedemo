import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await use(lp);
  },
  inventoryPage: async ({ page }, use) => {
    const ip = new InventoryPage(page);
    await use(ip);
  },
  cartPage: async ({ page }, use) => {
    const cp = new CartPage(page);
    await use(cp);
  },
  checkoutPage: async ({ page }, use) => {
    const chp = new CheckoutPage(page);
    await use(chp);
  },
});

export { expect } from '@playwright/test';
