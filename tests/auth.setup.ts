import { test as setup } from 'playwright/test';
import { expect } from '@playwright/test';

setup('Create customer 01 auth', async ({ page }) => {
  const email = 'sang1@gmail.com';
  const password = 'n&49ng2pYMPqG6';
  const authFile = './.auth/auth1.json';

  const loginError = page.getByTestId('login-error');

  await page.goto('/auth/login');

  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
  await expect(loginError).not.toBeVisible();

  const profileMenu = page.getByTestId('nav-menu');

  await page.waitForURL('/auth/login');
  await profileMenu.waitFor({ state: 'visible' });
  await expect(profileMenu).toContainText('Sang Nguyen');

  await page.context().storageState({ path: authFile });
});
