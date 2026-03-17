import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class Footer extends BasePage {
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;

  constructor(page: Page) {
    super(page);
    this.twitterLink = page.locator('a[data-test="social-twitter"]');
    this.facebookLink = page.locator('a[data-test="social-facebook"]');
    this.linkedinLink = page.locator('a[data-test="social-linkedin"]');
  }
}
