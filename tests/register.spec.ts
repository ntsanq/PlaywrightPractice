import { expect, test } from '@/fixtures';
import { UserFactory } from '@/datafactory';
test.describe('Register page test', () => {
  test('test successful register an account', async ({ registerPage }) => {
    const registerPayloadData = UserFactory.generateRegisterPayload();
    await registerPage.goto();
    await registerPage.fillForm(registerPayloadData);
    await registerPage.submit();
    await expect(registerPage.registrationError).not.toBeVisible();
  });
});
