import { test as setup } from 'playwright/test';
import { expect } from '@playwright/test';
import { RegisterRequest } from "./model";

const api = 'https://api.practicesoftwaretesting.com';

const email = `test_${Date.now()}@example.com`;

const payload: RegisterRequest = {
  first_name: 'Sang',
  last_name: 'Nguyen',
  dob: '2000-01-01',
  street: '123 abc',
  postal_code: '123123',
  city: 'HCM',
  state: 'HCM',
  country: 'VN',
  phone: '094384380',
  email,
  password: '123qwe!@#QWEzmzm',
};

const authFile = './.auth/auth1.json';

setup('Create customer 01 auth', async ({ page, request }) => {
  const response = await request.post(api + '/users/register', {
    data: payload,
  });
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body.email).toBe(payload.email);
  expect(body.first_name).toBe(payload.first_name);

  const loginError = page.getByTestId('login-error');

  await page.goto('/auth/login');
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(payload.password);
  await page.getByTestId('login-submit').click();
  await expect(loginError).not.toBeVisible();
  const profileMenu = page.getByTestId('nav-menu');
  await page.waitForURL('/account');
  await profileMenu.waitFor({ state: 'visible' });
  await expect(profileMenu).toContainText(
    `${payload.first_name} ${payload.last_name}`,
  );

  await page.context().storageState({ path: authFile });
});
