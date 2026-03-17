import { test as setup } from '../../fixtures/pomFixtures';
import * as path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page, loginPage }) => {
  // Navigate to login page
  await loginPage.navigateTo('/');
  
  // Perform login
  await loginPage.login();
  
  // Wait until the URL changes to inventory indicating successful login
  await page.waitForURL('**/inventory.html');
  
  // End of authentication steps.
  // We save the page state so that we don't need to log in for each test.
  await page.context().storageState({ path: authFile });
});
