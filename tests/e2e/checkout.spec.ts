import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Checkout flow', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // Go to inventory page first
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should complete end-to-end checkout successfully', async ({ inventoryPage, cartPage, checkoutPage }) => {
    // 1. Add item to cart
    await inventoryPage.addItemToCartByIndex(0);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 2. Go to cart
    await inventoryPage.goToCart();
    
    // 3. Verify item is in cart and proceed
    await cartPage.verifyItemsInCartCount(1);
    await cartPage.proceedToCheckout();

    // 4. Fill checkout information
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await checkoutPage.fillInformation('John', 'Doe', '12345');

    // 5. Verify order summary subtotal exists
    await expect(checkoutPage.subtotalLabel).toBeVisible();

    // 6. Finish checkout
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutCompleteMessage();
  });

});
