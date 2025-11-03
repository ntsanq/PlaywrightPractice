import { Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

export class AccountPage extends BasePage {
  readonly PATH = '/account';
  readonly TITLE = 'Overview - Practice Software Testing - Toolshop - v5.0';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto();
  }
}
