import { test, expect } from '@/fixtures';

test.describe('Login page test', () => {
  test('test success login with correct info', async ({
    loginPage,
    loggedUser,
  }) => {
    const email = loggedUser?.email;
    const password = loggedUser?.password;

    await loginPage.goto();
    await loginPage.fillForm({ email: email, password: password });
    await expect(loginPage.loginError).not.toBeVisible();
  });
});
