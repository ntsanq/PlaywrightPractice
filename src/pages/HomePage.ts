import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
  }

  async goto() {
    await this.page.goto('/');
  }
}
