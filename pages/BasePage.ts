import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path using base URL from configuration.
   * @param path specific path to navigate to
   */
  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Common method to get text recursively for elements
   */
  async getElementText(selector: string): Promise<string | null> {
    return this.page.locator(selector).textContent();
  }
}
