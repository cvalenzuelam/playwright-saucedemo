import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async verifyItemsInCartCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async removeItemByIndex(index: number) {
    const item = this.cartItems.nth(index);
    const removeButton = item.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
