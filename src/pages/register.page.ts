import { Locator, Page } from '@playwright/test';
import { RegisterModel } from '@/models';
import { BasePage } from '@/pages/base.page';

export class RegisterPage extends BasePage {
  readonly PATH = '/auth/register';
  readonly TITLE = 'Register - Practice Software Testing - Toolshop - v5.0';

  readonly signInButton: Locator;
  readonly loginLabel: Locator;
  readonly registerLink: Locator;
  readonly registerButton: Locator;
  readonly registrationError: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLabel = page.locator('h3', { hasText: 'Login' });
    this.signInButton = page.getByTestId('nav-sign-in');
    this.registerLink = page.getByTestId('register-link');
    this.registerButton = page.getByTestId('register-submit');
    this.registrationError = page.getByTestId('register-error');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async fillForm(inputData: RegisterModel) {
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
