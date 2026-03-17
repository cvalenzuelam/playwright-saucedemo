import { test, expect } from '../../fixtures/pomFixtures';

// We override the storage state here so these tests start completely unauthenticated
// This prevents the global auth setup from bypassing the login page
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login unhappy paths', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo('/');
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    // Attempt to log in with locked out user credentials
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    // Attempt to log in with wrong password
    await loginPage.login('standard_user', 'wrong_password');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('should show error when fields are empty', async ({ loginPage }) => {
    // Attempt to log in leaving fields empty by explicitly clearing them
    await loginPage.usernameInput.fill('');
    await loginPage.passwordInput.fill('');
    await loginPage.loginButton.click();
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

});
