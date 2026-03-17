import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SidebarMenu extends BasePage {
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly allItemsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.closeMenu();
  }
}
