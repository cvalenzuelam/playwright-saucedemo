import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as users from '../data/users.json';

/**
 * Suite de pruebas para el módulo de Login de SauceDemo.
 * Valida flujos de autenticación exitosos y fallidos.
 */
test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Should login successfully with standard_user', async ({ page }) => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    
    // Validamos que la URL cambie al inventario tras el login exitoso
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Should show error for locked_out_user', async () => {
    await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);
    
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
