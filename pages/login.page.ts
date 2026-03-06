import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

// 1. Usamos 'extends' para heredar de BasePage
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    // 2. 'super(page)' envía la pestaña al constructor de BasePage
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // Los métodos navigate() y login() siguen igual, pero ahora 
  // usan 'this.page' que heredaron de BasePage.
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
