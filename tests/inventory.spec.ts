import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import * as users from '../data/users.json';

test.describe('SauceDemo Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard_user.username, users.standard_user.password);
  });

  test('Should add a product to the cart', async () => {
    await inventoryPage.addItemToCart(0);
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('1');
  });

  test('Should remove a product from the cart', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.removeItemFromCart(0);
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('0');
  });
});
