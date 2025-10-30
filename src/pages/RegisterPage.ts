import { Locator, Page } from '@playwright/test';
import { RegisterRequest } from '../models';

export class RegisterPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly loginLabel: Locator;
  readonly registerLink: Locator;
  readonly registerButton: Locator;
  readonly registrationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLabel = page.locator('h3', { hasText: 'Login' });
    this.signInButton = page.getByTestId('nav-sign-in');
    this.registerLink = page.getByTestId('register-link');
    this.registerButton = page.getByTestId('register-submit');
    this.registrationError = page.getByTestId('register-error');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async fillForm(inputData: RegisterRequest) {
    for (const [testId, value] of Object.entries(inputData)) {
      const field = this.page.getByTestId(testId);

      if (testId === 'first_name' || testId === 'last_name') {
        break;
      }
      if (testId === 'country') {
        await field.selectOption({ value: value });
      } else {
        await field.fill(value);
      }
    }
  }

  async submit() {
    await this.registerButton.click();
  }
}
