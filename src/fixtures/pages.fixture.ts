import { test as baseTest } from '@playwright/test';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ContactPage,
  AccountPage,
  MessagesPage,
} from '@/pages';

export type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  contactPage: ContactPage;
  accountPage: AccountPage;
  messagesPage: MessagesPage;
};

export const pageFixtures = baseTest.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
});
