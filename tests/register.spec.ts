import { test, expect } from '@playwright/test';

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
  await page.goto('/');

  const signInButton = page.getByTestId('nav-sign-in');
  const loginLabel = page.locator('h3', { hasText: 'Login' });
  const registerLink = page.getByTestId('register-link');
  const registerButton = page.getByTestId('register-submit');
  const registrationError = page.getByTestId('register-error');

  await expect(signInButton).toBeVisible();
  await signInButton.click();
  await expect(loginLabel).toBeVisible();
  await expect(page).toHaveTitle(
    'Login - Practice Software Testing - Toolshop - v5.0',
  );
  await expect(registerLink).toBeVisible();
  await registerLink.click();

  for (const [testId, value] of Object.entries(inputData)) {
    if (testId === 'country') {
      await page.getByTestId(testId).selectOption({ label: 'Viet Nam' });
    } else {
      await page.getByTestId(testId).fill(value);
    }
  }
  await registerButton.click();
  await page.waitForURL('/auth/login');
  await expect(registrationError).toHaveCount(0);
});
