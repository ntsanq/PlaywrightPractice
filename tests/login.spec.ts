import { test, expect } from '@/fixtures';
import fs from 'fs';

test.describe('login', () => {
  test('test success login', async ({ loginPage }) => {
    const loginData = JSON.parse(
      fs.readFileSync('.auth/auth.meta.json', 'utf-8'),
    );

    const email = loginData?.email;
    const password = loginData?.password;

    await loginPage.goto();
    await loginPage.fillForm({ email: email, password: password });
    await expect(loginPage.loginError).not.toBeVisible();
  });
});
