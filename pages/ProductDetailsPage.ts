import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductDetails() {
    return {
      name: await this.productName.textContent(),
      description: await this.productDescription.textContent(),
      price: await this.productPrice.textContent()
    };
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickBackToProducts() {
    await this.backToProductsButton.click();
  }
}
