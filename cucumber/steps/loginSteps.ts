import { expect } from '@playwright/test';
import { Given, Then, When } from '@cucumber/cucumber';

import { page } from '../browserSetup';
import { LoginPage } from '../page-objects/login.page';

Given('the user is on the login page', async () => {
  await page.goto('https://binaryville.com/account');
});

When('the user enter a valid email and password', async () => {
  const loginPage = new LoginPage(page);

  await loginPage.emailInput.fill('test@gmail.com');
  await loginPage.passwordInput.fill('pass123');
  await loginPage.submitButton.click();
});

Then('the user should see their email and password in the URL', async () => {
  await expect(page).toHaveURL(/test%40gmail.com/);
  await expect(page).toHaveURL(/pass123/);
});
