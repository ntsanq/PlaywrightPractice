import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  abstract readonly PATH: string;
  abstract readonly TITLE: RegExp | string;

  // only subclasses like this can call the constructor
  protected constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.PATH);
  }
}
