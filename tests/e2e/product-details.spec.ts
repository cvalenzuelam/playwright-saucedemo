import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Product Details Page (PDP)', () => {
  
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should display correct product metadata and allow adding to cart', async ({ inventoryPage, productDetailsPage }) => {
    // 1. Get info from the inventory list to compare later
    const firstProductName = await inventoryPage.getProductNames().then(names => names[0]);
    const firstProductPrice = await inventoryPage.getProductPrices().then(prices => prices[0]);

    // 2. Click on the item to navigate to PDP
    await inventoryPage.clickProductByName(firstProductName);

    // 3. Verify URL changed to inventory-item
    await expect(inventoryPage.page).toHaveURL(/.*inventory-item\.html.*/);

    // 4. Extract data from PDP
    const pdpDetails = await productDetailsPage.getProductDetails();

    // 5. Assertions
    expect(pdpDetails.name).toEqual(firstProductName);
    expect(pdpDetails.price).toContain(firstProductPrice.toString());
    expect(pdpDetails.description?.length).toBeGreaterThan(10);

    // 6. Test Add to Cart from PDP
    await productDetailsPage.clickAddToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 7. Test Back button
    await productDetailsPage.clickBackToProducts();
    await expect(inventoryPage.page).toHaveURL(/.*inventory\.html/);
  });

});
