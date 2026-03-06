import { test, expect } from '../fixtures/base.fixture';
import * as users from '../data/users.json';

test.describe('SauceDemo E2E Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
  });

  test('Debería completar una compra de principio a fin', async ({ inventoryPage, cartPage, checkoutPage }) => {
    // 1. Inventario: Añadir producto y navegar al carrito
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();

    // 2. Carrito: Avanzar al Checkout
    await cartPage.clickCheckout();

    // 3. Checkout: Completar formulario
    await checkoutPage.fillInformation('Chris', 'Valenzuela', '12345');

    // 4. Checkout: Finalizar
    await checkoutPage.finishOrder();

    // 5. Validación final
    const successMessage = await checkoutPage.getCompleteMessage();
    expect(successMessage).toBe('Thank you for your order!');
  });
});
