import { test, expect } from '../fixtures/base.fixture';
import * as users from '../data/users.json';

test.describe('SauceDemo Inventory Tests', () => {

  // Antes de cada prueba en este archivo, nos logueamos
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
  });

  test('Debería añadir un producto al carrito', async ({ inventoryPage }) => {
    // 1. Añadimos el primer producto (índice 0)
    await inventoryPage.addItemToCart(0);

    // 2. Verificamos que el badge del carrito diga '1'
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe('1');
  });

  test('Debería añadir dos productos al carrito', async ({ inventoryPage }) => {
    // 1. Añadimos dos productos
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);

    // 2. Verificamos que el badge del carrito diga '2'
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe('2');
  });
});
