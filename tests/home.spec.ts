import { expect, test } from '@playwright/test';

test.use({ headless: false });

test.describe('Homepage with no authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('check grid with 9 items with no authentication', async ({ page }) => {
    await expect(page.getByTestId('nav-home')).toBeVisible();
    const productCart = page.locator('.col-md-9').getByRole('link');
    await expect(productCart).toHaveCount(9);
  });
});

test.describe('Homepage with Auth1', () => {
  test.use({ storageState: '.auth/auth1.json' });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('check grid with 9 items', async ({ page }) => {
    await expect(page.getByTestId('nav-home')).toBeVisible();
    const productCart = page.locator('.col-md-9').getByRole('link');
    await expect(productCart).toHaveCount(9);
  });
});
