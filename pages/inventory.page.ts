import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page); // Pasamos la pestaña a BasePage
    // Localizador para todos los productos (Playwright puede manejar múltiples elementos con un solo locator)
    this.inventoryItems = page.locator('.inventory_item');
    // Localizador para el número rojo que sale en el carrito
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Método para agregar un producto al carrito por su índice (0 para el primero, 1 para el segundo...)
  async addItemToCart(index: number = 0) {
    const item = this.inventoryItems.nth(index); // Seleccionamos el producto N
    const addToCartButton = item.locator('button[id^="add-to-cart"]'); // Buscamos su botón específico
    await addToCartButton.click();
  }

  // Método para obtener cuántos productos hay en el carrito
  async getCartBadgeCount() {
    // Si el carrito está vacío, el badge no existe en el DOM
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent();
    }
    return '0';
  }
}
