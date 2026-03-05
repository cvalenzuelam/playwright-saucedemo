import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart(index: number = 0) {
    const item = this.inventoryItems.nth(index);
    const addToCartButton = item.locator('button[id^="add-to-cart"]');
    await addToCartButton.click();
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent();
    }
    return '0';
  }

  async removeItemFromCart(index: number = 0) {
    const item = this.inventoryItems.nth(index);
    const removeButton = item.locator('button[id^="remove"]');
    await removeButton.click();
  }
}
