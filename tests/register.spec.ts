import { expect, test } from '@playwright/test';
import { RegisterPage } from '../src/pages';
import { UserFactory } from '../src/data/user.factory';

test('register', async ({ page }) => {
  const inputData = UserFactory.generateRegisterPayload();
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillForm(inputData);
  await registerPage.submit();
  await expect(registerPage.registrationError).not.toBeVisible();
});
