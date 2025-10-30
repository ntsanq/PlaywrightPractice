import { expect, Locator } from '@playwright/test';

expect.extend({
  async toHaveUserName(received: Locator, expectedName: string) {
    const text = (await received.textContent())?.trim();
    const pass = text === expectedName;

    return {
      pass,
      message: () =>
        pass
          ? `✅ User name matched: ${expectedName}`
          : `❌ Expected user name "${expectedName}", but got "${text}"`,
    };
  },
});
