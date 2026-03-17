import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Footer Social Links (New Tabs Handling)', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // Navigate to a page that contains the footer
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should open Twitter link in a new tab', async ({ footer }) => {
    // 1. Context starts listening for 'page' event (a new tab opening)
    const pagePromise = footer.page.context().waitForEvent('page');
    
    // 2. Click the link that opens the tab
    await footer.twitterLink.click();
    
    // 3. Await the promise to resolve the new page object
    const newPage = await pagePromise;
    
    // 4. Wait for it to load and verify the URL
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('x.com/saucelabs');
  });

  test('should open LinkedIn link in a new tab', async ({ footer }) => {
    const pagePromise = footer.page.context().waitForEvent('page');
    await footer.linkedinLink.click();
    const newPage = await pagePromise;
    
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('linkedin.com');
  });

});
