import { test, expect } from '@/fixtures';
import fs from 'fs';

test.describe('login', () => {
  test('test success login', async ({ loginPage, loggedUser }) => {
    const email = loggedUser?.email;
    const password = loggedUser?.password;

    await loginPage.goto();
    await loginPage.fillForm({ email: email, password: password });
    await expect(loginPage.loginError).not.toBeVisible();
  });
});
