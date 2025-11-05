import { expect, test } from '@/fixtures';

const AUTH_FILE = '.auth/auth.json';
const PRODUCTS_API = 'https://api.practicesoftwaretesting.com/products**';
const EXPECTED_PRODUCT_COUNT = 9;

test.describe('Homepage with no Authentication', () => {
  test('check grid with 9 items with no authentication', async ({
    homePage,
  }) => {
    await homePage.goto();

    const productCart = await homePage.productList.getAllNames();
    expect(productCart.length).toBe(EXPECTED_PRODUCT_COUNT);
  });
});

test.describe('Homepage with Authentication', () => {
  test.use({ storageState: AUTH_FILE });

  test('check grid with 9 items', async ({ homePage, loggedUser }) => {
    await homePage.goto();
    await expect(homePage.navMenu.homeLink).toBeVisible();
    const isLoggedIn = await homePage.navMenu.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await expect(homePage.navMenu.accountMenuLink).toHaveUserName(
      `${loggedUser['first-name']} ${loggedUser['last-name']}`,
    );
  });
});

test.describe('Homepage test with HTTP request', async () => {
  test('Validate product data is visible in UI from API', async ({
    page,
    homePage,
  }) => {
    let productsFromApi: any = null;

    await test.step('intercept /products', async () => {
      await page.route(PRODUCTS_API, async (route) => {
        const response = await route.fetch();
        if (response.headers()['content-type']?.includes('application/json')) {
          productsFromApi = await response.json();
        }
        await route.fulfill({ response });
      });
    });

    await homePage.goto();

    const productsList = await homePage.productList.getAllNames();

    expect(productsFromApi).not.toBeNull();
    for (const product of productsFromApi.data) {
      expect(productsList).toContain(product.name);
    }
  });
});
