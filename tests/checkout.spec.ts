import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import * as users from '../data/users.json';

test.describe('SauceDemo Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigate();
    await loginPage.login(users.standard_user.username, users.standard_user.password);
  });

  test('Should complete a purchase successfully', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    
    await cartPage.checkout();
    
    await checkoutPage.fillInformation('Chris', 'Valenzuela', '12345');
    await checkoutPage.finishOrder();
    
    const message = await checkoutPage.getCompleteMessage();
    expect(message).toBe('Thank you for your order!');
  });
});
