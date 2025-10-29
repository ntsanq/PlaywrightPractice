import { Locator, Page } from '@playwright/test';

export class NotificationBar {
  readonly bar: Locator;
  readonly message: Locator;
  readonly testingGuideButton: Locator;
  readonly bugHuntingButton: Locator;

  constructor(page: Page) {
    this.bar = page.locator('.testing-notification-bar');
    this.message = this.bar.locator('.container > span');
    this.testingGuideButton = this.bar.locator('.testing-guide-btn');
    this.bugHuntingButton = this.bar.locator('.bug-hunting-btn');
  }

  async clickTestingGuide() {
    await this.testingGuideButton.click();
  }

  async clickBugHunting() {
    await this.bugHuntingButton.click();
  }
}
