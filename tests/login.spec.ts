import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('login', () => {
  test('test success login', async ({ page }) => {
    const loginData = {
      email: 'dfasdf@mdf.com',
      password: 'welcomse',
    };

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillForm(loginData.email, loginData.password);
    await loginPage.fillForm(loginData.email, loginData.password);
    await expect(loginPage.loginError).not.toBeVisible();
  });
});
