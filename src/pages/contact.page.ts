import { Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

type ContactFormFields =
  | 'first-name'
  | 'last-name'
  | 'email'
  | 'subject'
  | 'message'
  | 'attachment';

export class ContactPage extends BasePage {
  readonly PATH = '/contact';
  readonly TITLE = 'Contact Us - Practice Software Testing - Toolshop - v5.0';

  readonly greetingMessage: Locator;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly attachmentInput: Locator;
  readonly submitButton: Locator;
  readonly alertMessage: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);

    this.greetingMessage = page.getByText(
      /Hello\s.+, please fill out this form to submit your message\./,
    );
    this.subjectSelect = page.getByTestId('subject');
    this.messageInput = page.getByTestId('message');
    this.attachmentInput = page.getByTestId('attachment');
    this.submitButton = page.getByTestId('contact-submit');
    this.alertMessage = page.getByRole('alert');

    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.emailInput = page.getByTestId('email');
    this;
  }

  async goto() {
    await super.goto();
  }

  async fillForm(
    subject: string,
    message: string,
    attachmentPath?: string,
    unauthorized?: { firstName: string; lastName: string; email: string },
  ) {
    if (unauthorized) {
      await this.firstNameInput.fill(unauthorized.firstName);
      await this.lastNameInput.fill(unauthorized.lastName);
      await this.emailInput.fill(unauthorized.email);
    }
    await this.subjectSelect.selectOption(subject);
    await this.messageInput.fill(message);

    if (attachmentPath) {
      await this.attachmentInput.setInputFiles(attachmentPath);
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  getErrorFor(field: ContactFormFields): Locator {
    return this.page.getByTestId(`${field}-error`);
  }

  async isAnyErrorDisplayed(): Promise<boolean> {
    const fields: ContactFormFields[] = [
      'first-name',
      'last-name',
      'email',
      'subject',
      'message',
      'attachment',
    ];

    for (const field of fields) {
      const errorLocator = this.getErrorFor(field);
      if (await errorLocator.isVisible()) {
        return true;
      }
    }

    return false;
  }
}
