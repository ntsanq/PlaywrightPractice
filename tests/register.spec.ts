import { expect, test } from '@/fixtures';
import { UserFactory } from '@/datafactory';

test('register', async ({ registerPage }) => {
  const registerPayloadData = UserFactory.generateRegisterPayload();
  await registerPage.goto();
  await registerPage.fillForm(registerPayloadData);
  await registerPage.submit();
  await expect(registerPage.registrationError).not.toBeVisible();
});
