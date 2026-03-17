import { test, expect } from '../../fixtures/pomFixtures';

test.describe('Robust Sorting Validations', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');
  });

  test('should sort products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    
    // Create a sorted copy of the extracted prices
    const expectedSortedPrices = [...prices].sort((a, b) => a - b);
    
    // Assert the UI array matches the mathematically sorted array
    expect(prices).toEqual(expectedSortedPrices);
  });

  test('should sort products by price from high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    
    const expectedSortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(expectedSortedPrices);
  });

  test('should sort products by name from Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    
    const expectedSortedNames = [...names].sort().reverse();
    expect(names).toEqual(expectedSortedNames);
  });

});
