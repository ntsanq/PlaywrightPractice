import { expect, test } from '@playwright/test';
import { RegisterPage } from '../src/pages';

test.use({ headless: false });

const inputData = {
  'first-name': 'Sang',
  'last-name': 'Nguyen',
  dob: '2000-01-01',
  street: '123 abc',
  postal_code: '123123',
  city: 'HCM',
  state: 'HCM',
  phone: '094384380',
  country: 'VN',
  email: 'sang1@gmail.com',
  password: 'n&49ng2pYMPqG6',
};

test('register', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillForm(inputData);
  await registerPage.submit();
  await expect(registerPage.registrationError).not.toBeVisible();
});
