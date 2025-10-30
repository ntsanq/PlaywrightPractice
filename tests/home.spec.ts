import { expect, test } from '@playwright/test';
import { HomePage } from '@/pages';
import fs from 'fs';

test.describe('Homepage with no Authentication', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test('check grid with 9 items with no authentication', async ({ page }) => {
    await expect(page.getByTestId('nav-home')).toBeVisible();
    const productCart = page.locator('.col-md-9').getByRole('link');
    await expect(productCart).toHaveCount(9);
  });
});

test.describe('Homepage with Authentication', () => {
  test.use({ storageState: '.auth/auth.json' });
  test.beforeEach(async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.goto();
  });

  test('check grid with 9 items', async ({ page }) => {
    const homepage = new HomePage(page);
    await expect(homepage.navMenu.homeLink).toBeVisible();
    await expect(homepage.navMenu.accountNameLink).toBeVisible({
      timeout: 10000,
    });

    const userData = JSON.parse(
      fs.readFileSync('.auth/auth.meta.json', 'utf-8'),
    );

    await expect(homepage.navMenu.accountNameLink).toHaveUserName(
      `${userData['first-name']} ${userData['last-name']}`,
    );
  });
});
