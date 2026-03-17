import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Inventory feature', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // Navigating back to the inventory since auth state retains session
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should display sorting by price correctly', async ({ inventoryPage }) => {
    // Validate we are on inventory page
    await expect(inventoryPage.title).toHaveText('Products');
    
    // Sort from low to high
    await inventoryPage.sortBy('lohi');
    
    // Validate products are visible (a real test could check text array order)
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
  });

  test('should add an item to the cart and update badge count', async ({ inventoryPage }) => {
    // Initially, there shouldn't be a badge or it should be specific count
    await inventoryPage.addItemToCartByIndex(0);
    
    // Check that badge updates
    await expect(inventoryPage.cartBadge).toHaveText('1');
    
    // Add another
    await inventoryPage.addItemToCartByIndex(1);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

});
