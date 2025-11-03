import { test as setup } from 'playwright/test';
import { expect } from '@playwright/test';
import fs from 'fs';
import { UserFactory } from '@/datafactory';

const api = 'https://api.practicesoftwaretesting.com';
const authFile = './.auth/auth.json';
const authInfoFile = './.auth/auth.meta.json';

setup('prepare a customer account cookie', async ({ page, request }) => {
  const payload = UserFactory.generateRegisterPayload();

  const response = await request.post(api + '/users/register', {
    data: payload,
  });
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body.email).toBe(payload.email);
  expect(body.first_name).toBe(payload['first-name']);

  const loginError = page.getByTestId('login-error');

  await page.goto('/auth/login');
  await page.getByTestId('email').fill(payload.email);
  await page.getByTestId('password').fill(payload.password);
  await page.getByTestId('login-submit').click();
  await expect(loginError).not.toBeVisible();
  const profileMenu = page.getByTestId('nav-menu');
  await page.waitForURL('/account');
  await profileMenu.waitFor({ state: 'visible' });
  const accountName = await profileMenu.innerText();
  expect(accountName.trim()).toBe(
    `${payload['first-name']} ${payload['last-name']}`,
  );

  await page.context().storageState({ path: authFile });
  fs.writeFileSync(authInfoFile, JSON.stringify(payload));
});
