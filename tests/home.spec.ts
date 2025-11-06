import { expect, test } from '@/fixtures';

const AUTH_FILE = '.auth/auth.json';
const PRODUCTS_API = 'https://api.practicesoftwaretesting.com/products**';

test.describe('Home page test with NO authorized', () => {
  test('test products list to have items with no authorized', async ({
    homePage,
  }) => {
    await homePage.goto();
    await homePage.productList.waitForFullyLoaded();
    const count = await homePage.productList.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Home page test with authorized', () => {
  test.use({ storageState: AUTH_FILE });

  test('test products list to have items', async ({ homePage, loggedUser }) => {
    await homePage.goto();
    await expect(homePage.navMenu.homeLink).toBeVisible();
    const isLoggedIn = await homePage.navMenu.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await homePage.productList.waitForFullyLoaded();
    const count = await homePage.productList.count();
    expect(count).toBeGreaterThan(0);

    await expect(homePage.navMenu.accountMenuLink).toHaveUserName(
      `${loggedUser['first-name']} ${loggedUser['last-name']}`,
    );
  });
});

test.describe('Home page test with HTTP request', () => {
  test('test verifying product data to be matched in UI from API', async ({
    page,
    homePage,
  }) => {
    let productsFromApi: any = null;

    await test.step('intercept /products api', async () => {
      await page.route(PRODUCTS_API, async (route) => {
        const response = await route.fetch();
        if (response.headers()['content-type']?.includes('application/json')) {
          productsFromApi = await response.json();
        }
        await route.fulfill({ response });
      });
    });

    await test.step('go to home page', async () => {
      await homePage.goto();
    });

    await test.step('verify all visible product cards should contains the data from API', async () => {
      const productCards = await homePage.productList.getAllNames();
      expect(productsFromApi).not.toBeNull();
      for (const product of productsFromApi.data) {
        expect(productCards).toContain(product.name);
      }
    });
  });

  test('test verifying product data to be matched from modified API', async ({
    page,
    homePage,
  }) => {
    const modifiedValues = {
      name: 'test',
      price: 7979797,
    };

    await test.step('overwrite /products api', async () => {
      await page.route(PRODUCTS_API, async (route) => {
        const response = await route.fetch();
        const json = await response.json();

        json.data[0].name = modifiedValues.name;
        json.data[0].price = modifiedValues.price;

        await route.fulfill({
          response,
          json,
        });
      });
    });

    await test.step('go to home page', async () => {
      await homePage.goto();
    });

    await test.step('verify first product to be the modified data', async () => {
      const firstProduct = homePage.productList.getAllProducts().first();
      await expect(firstProduct).toBeVisible();
      await expect(firstProduct).toContainText(modifiedValues.name);

      const testProduct = homePage.productList.getProductByName(
        modifiedValues.name,
      );
      await expect(testProduct).toContainText(modifiedValues.name);
      await expect(testProduct).toContainText(String(modifiedValues.price));
    });
  });

  test('test verifying first product to be loaded from hard file', async ({
    page,
    homePage,
  }) => {
    await test.step('mock /products', async () => {
      await page.routeFromHAR('.har/product.har', {
        url: PRODUCTS_API,
        update: false, // toggle this if there is no .har file yet
      });
    });
    await test.step('go to home page', async () => {
      await homePage.goto();
    });
    await test.step('verify first product to be loaded from hard file', async () => {
      await homePage.productList.waitForFullyLoaded();
      const count = await homePage.productList.count();
      expect(count).toBeGreaterThan(0);
      const allProducts = homePage.productList.getAllProducts();
      await expect(allProducts.first()).toContainText('Happy birthday');
      const find = homePage.productList.getProductByName('Happy birthday');
      await expect(find).toContainText('111.15');
    });
  });
});

test.describe('Home page test with injecting Javascript', () => {
  test('test verifying if there is any broken image', async ({
    page,
    homePage,
  }) => {
    await homePage.goto();
    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => {
          return img.src;
        });
    });

    expect(
      brokenImages.length,
      `Broken images: ${brokenImages.toString()}`,
    ).toBe(0);
  });
});
