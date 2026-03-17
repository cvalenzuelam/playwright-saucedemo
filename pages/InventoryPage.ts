import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    // Best practice: Use data attributes or accessible locators when possible
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addItemToCartByIndex(index: number) {
    // Select the "Add to cart" button inside a specific inventory item
    const item = this.inventoryItems.nth(index);
    const addToCartButton = item.locator('button:has-text("Add to cart")');
    await addToCartButton.click();
  }

  async removeItemFromCartByIndex(index: number) {
    const item = this.inventoryItems.nth(index);
    const removeButton = item.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('.inventory_item_price').allTextContents();
    // Remove the $ sign and parse to float
    return priceElements.map(price => parseFloat(price.replace('$', '')));
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async clickProductByName(name: string) {
    await this.page.locator(`.inventory_item_name:has-text("${name}")`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
