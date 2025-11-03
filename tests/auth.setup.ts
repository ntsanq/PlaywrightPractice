import { test as setup } from 'playwright/test';
import { expect } from '@playwright/test';
import fs from 'fs';
import { UserFactory } from '@/datafactory';
import { HomePage, LoginPage } from '@/pages';
import { AccountPage } from '@/pages/account.page';

const api = 'https://api.practicesoftwaretesting.com';
const authFile = './.auth/auth.json';
const authInfoFile = './.auth/auth.meta.json';

setup('Prepare a customer account cookie', async ({ page, request }) => {
  const payload = UserFactory.generateRegisterPayload();
  const response = await request.post(api + '/users/register', {
    data: payload,
  });
  const body = await response.json();

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await setup.step(
    'Verify register response success with relevant data',
    () => {
      expect(body).toHaveProperty('id');
      expect(body.email).toBe(payload.email);
      expect(body.first_name).toBe(payload['first-name']);
    },
  );

  await setup.step('Login on the browser and verify no error', async () => {
    await homePage.goto();
    const loginError = loginPage.loginError;
    await homePage.navMenu.navigateToSignIn();
    await loginPage.fillForm({
      email: payload.email,
      password: payload.password,
    });
    await loginPage.submit();
    await expect(loginError).not.toBeVisible();
  });

  await setup.step('Verify logged in', async () => {
    await expect(page).toHaveTitle(accountPage.TITLE);
    expect(await homePage.navMenu.isLoggedIn()).toBeTruthy();
  });

  await setup.step('Write the cookie to .auth/auth.json', async () => {
    await page.context().storageState({ path: authFile });
    fs.writeFileSync(authInfoFile, JSON.stringify(payload));
  });
});
