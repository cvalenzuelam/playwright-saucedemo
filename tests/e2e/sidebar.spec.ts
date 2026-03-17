import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Sidebar and App State', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should correctly logout user', async ({ sidebarMenu, loginPage }) => {
    await sidebarMenu.logout();
    
    // Verify redirection to login page and elements are visible
    await expect(loginPage.page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should reset app state (clear cart)', async ({ inventoryPage, sidebarMenu }) => {
    // 1. Add item
    await inventoryPage.addItemToCartByIndex(0);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 2. Reset App State
    await sidebarMenu.resetAppState();

    // 3. Verify badge is gone
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

});
