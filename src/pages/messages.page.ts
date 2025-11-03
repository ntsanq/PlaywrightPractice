import { Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

export class MessagesPage extends BasePage {
  readonly PATH = '/account/messages';
  readonly TITLE = 'Messages - Practice Software Testing - Toolshop - v5.0';

  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    super(page);
    this.table = page.locator('table.table');
    this.rows = this.table.locator('tbody tr');
  }

  async gotoMessageDetail(id: string) {
    await this.page.goto(`/account/messages/${id}`);
  }

  getRowBySubject(subject: string): Locator {
    return this.rows.filter({ hasText: subject });
  }

  getRowByMessage(message: string): Locator {
    return this.rows.filter({ hasText: message });
  }
}
