import { expect, test } from '@/fixtures';
import fs from 'fs';

test.describe('Homepage with no Authentication', () => {
  test('check grid with 9 items with no authentication', async ({
    page,
    homePage,
  }) => {
    await homePage.goto();
    const productCart = page.locator('.col-md-9').getByRole('link');
    await expect(productCart).toHaveCount(9);
  });
});

test.describe('Homepage with Authentication', () => {
  test.use({ storageState: '.auth/auth.json' });

  test('check grid with 9 items', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.navMenu.homeLink).toBeVisible();
    const isLoggedIn = homePage.navMenu.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    const userData = JSON.parse(
      fs.readFileSync('.auth/auth.meta.json', 'utf-8'),
    );

    await expect(homePage.navMenu.accountMenuLink).toHaveUserName(
      `${userData['first-name']} ${userData['last-name']}`,
    );
  });
});
