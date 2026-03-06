import { test, expect } from '../fixtures/base.fixture';
import * as users from '../data/users.json';

test.describe('SauceDemo Login Tests - Fixtures & Data Driven', () => {

  // Fíjate: ¡Ya no hay 'let loginPage' ni 'beforeEach'!
  // Playwright inyecta el 'loginPage' ya navegado a la URL
  test('Login exitoso con standard_user', async ({ loginPage, page }) => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Error al loguear con locked_out_user', async ({ loginPage, page }) => {
    await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);

    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
