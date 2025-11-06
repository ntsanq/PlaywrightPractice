import { test as setup, expect } from '@/fixtures';
import fs from 'fs';
import { UserFactory } from '@/datafactory';

const api = 'https://api.practicesoftwaretesting.com';
const authFile = './.auth/auth.json';
const authInfoFile = './.auth/auth.meta.json';

setup(
  'Setup a new customer account',
  async ({ page, homePage, loginPage, accountPage, request }) => {
    const registerPayloadData = UserFactory.generateRegisterPayload();
    const response = await request.post(api + '/users/register', {
      data: registerPayloadData,
    });
    const body = await response.json();

    await setup.step(
      'verify register response success with relevant data',
      () => {
        expect(body).toHaveProperty('id');
        expect(body.email).toBe(registerPayloadData.email);
        expect(body.first_name).toBe(registerPayloadData['first-name']);
      },
    );

    await setup.step('login on the browser and verify no error', async () => {
      await homePage.goto();
      const loginError = loginPage.loginError;
      await homePage.navMenu.navigateToSignIn();
      await loginPage.fillForm({
        email: registerPayloadData.email,
        password: registerPayloadData.password,
      });
      await loginPage.submit();
      await expect(loginError).not.toBeVisible();
    });

    await setup.step('verify logged in', async () => {
      await expect(page).toHaveTitle(accountPage.TITLE);
      const isLoggedIn = await homePage.navMenu.isLoggedIn();
      expect(isLoggedIn).toBeTruthy();
    });

    await setup.step('write the cookie to .auth/auth.json', async () => {
      await page.context().storageState({
        path: authFile,
      });
      fs.writeFileSync(authInfoFile, JSON.stringify(registerPayloadData));
    });
  },
);
