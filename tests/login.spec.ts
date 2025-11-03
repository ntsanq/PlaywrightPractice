import { expect, test } from '@playwright/test';
import { LoginPage } from '@/pages';
import fs from 'fs';

test.describe('login', () => {
  test('test success login', async ({ page }) => {
    const loginData = JSON.parse(
      fs.readFileSync('.auth/auth.meta.json', 'utf-8'),
    );

    const email = loginData?.email;
    const password = loginData?.password;

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillForm({ email: email, password: password });
    await expect(loginPage.loginError).not.toBeVisible();
  });
});
