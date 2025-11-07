import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000);

let page: Page;
let context: BrowserContext;
let browser: Browser;

Before(async () => {
  browser = await chromium.launch({
    headless: false,
  });

  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => await browser.close());

export { page };
