import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page'; // Importamos la nueva página

// Añadimos la nueva página al tipo de las fixtures
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await use(lp);
  },
  
  // Añadimos cómo se fabrica el inventoryPage
  inventoryPage: async ({ page }, use) => {
    const ip = new InventoryPage(page);
    await use(ip);
  },
});

export { expect } from '@playwright/test';
