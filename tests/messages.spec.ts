import { expect, test } from '@/fixtures';
import fs from 'fs';
import { faker } from '@faker-js/faker';

test.describe('messages with authorized', () => {
  test.use({ storageState: '.auth/auth.json' });

  test('test messages with authorized', async ({
    page,
    homePage,
    messagesPage,
    contactPage,
    loggedUser,
  }) => {
    const input = {
      subject: 'Return',
      message:
        'This is a message. This is a message. This is a message. This is a message. This is a message. This is a message. This is a message. This is a message.',
      attachment: '',
    };

    await test.step('Open home page and verify logged in', async () => {
      await homePage.goto();
      const isLoggedIn = await homePage.navMenu.isLoggedIn();
      expect(isLoggedIn).toBeTruthy();
    });

    await test.step('Navigate contact page', async () => {
      await homePage.navMenu.navigateToContact();
      await expect(page).toHaveTitle(contactPage.TITLE);
    });

    await test.step('Submit a message', async () => {
      await expect(contactPage.greetingMessage).toContainText(
        `Hello ${loggedUser.first_name} ${loggedUser.last_name}`,
        {
          timeout: 10000,
        },
      );
      await contactPage.fillForm(
        input.subject,
        input.message,
        input.attachment,
      );

      await contactPage.submit();
    });

    await test.step('Verify and check there is a success message', async () => {
      await expect(page).toHaveTitle(contactPage.TITLE);
    });

    await test.step('Check success message', async () => {
      await expect(contactPage.alertMessage).toContainText(
        'Thanks for your message! We will contact you shortly.',
      );
    });

    await test.step('Navigate to messages page and verify reaching', async () => {
      await homePage.navMenu.navigateToMyMessages();
      await expect(page).toHaveTitle(messagesPage.TITLE);
    });

    await test.step('verify the messages is it match', async () => {
      await messagesPage.goto();

      await expect(messagesPage.getRowBySubject(input.subject)).toContainText(
        input.message.split(' ').slice(0, 4).join(' '),
      );
    });
  });
});

test('test messages with unauthorized', async ({ homePage, contactPage }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const attachment = 'resources/attachmentSample.txt';

  const input = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    subject: 'Return',
    message: faker.lorem.paragraph({ min: 2, max: 4 }),
    attachmentPath: attachment,
  };

  await test.step('Open home page and verify not authorized', async () => {
    await homePage.goto();
    const isLoggedIn = await homePage.navMenu.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  await test.step('Navigate to contact page', async () => {
    await homePage.navMenu.navigateToContact();
  });

  await test.step('Verify contact page and fill information', async () => {
    await homePage.navMenu.navigateToContact();
    await contactPage.fillForm(
      input.subject,
      input.message,
      input.attachmentPath,
      {
        firstName: input.first_name,
        lastName: input.last_name,
        email: input.email,
      },
    );

    await contactPage.submit();
    expect(await contactPage.isAnyErrorDisplayed()).toBeFalsy();
  });
});
