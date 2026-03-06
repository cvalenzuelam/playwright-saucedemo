import { Page } from '@playwright/test';

export class BasePage {
  // 'protected' permite que las clases que heredan vean esta propiedad
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Método común para todas las páginas
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async getTitle() {
    return await this.page.title();
  }
}
