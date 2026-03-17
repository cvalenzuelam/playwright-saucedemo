import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SidebarMenu } from '../pages/SidebarMenu';
import { Footer } from '../pages/Footer';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productDetailsPage: ProductDetailsPage;
  sidebarMenu: SidebarMenu;
  footer: Footer;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  sidebarMenu: async ({ page }, use) => {
    await use(new SidebarMenu(page));
  },
  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
});

export { expect } from '@playwright/test';
