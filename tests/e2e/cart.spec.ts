import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Advanced Cart Management', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should be able to remove items from cart page', async ({ inventoryPage, cartPage }) => {
    // Add two items
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Go to cart
    await inventoryPage.goToCart();
    await cartPage.verifyItemsInCartCount(2);

    // Remove one item from the cart page
    await cartPage.removeItemByIndex(0);
    
    // Verify cart reflects the removal
    await cartPage.verifyItemsInCartCount(1);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should be able to remove items from inventory page', async ({ inventoryPage }) => {
    // Add one item
    await inventoryPage.addItemToCartByIndex(0);
    await expect(inventoryPage.cartBadge).toBeVisible();
    
    // Remove the item right from the inventory page
    await inventoryPage.removeItemFromCartByIndex(0);
    
    // Badge should disappear entirely when cart is empty
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

});
