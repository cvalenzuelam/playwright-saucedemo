import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Checkout Unhappy Paths', () => {

  test.beforeEach(async ({ inventoryPage, cartPage, checkoutPage }) => {
    // Prep work to reach checkout form
    await inventoryPage.navigateTo('/inventory.html');
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('should require First Name', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('', 'Doe', '12345');
    await expect(checkoutPage.page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  test('should require Last Name', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('John', '', '12345');
    await expect(checkoutPage.page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  });

  test('should require Postal Code', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('John', 'Doe', '');
    await expect(checkoutPage.page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  });

});
