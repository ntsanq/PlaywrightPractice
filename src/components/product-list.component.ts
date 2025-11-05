import { Page, Locator, expect } from '@playwright/test';

export class ProductListComponent {
  readonly page: Page;
  readonly products: Locator;
  readonly loadingSkeletons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('a[data-test^="product-"]');
    this.loadingSkeletons = page.locator('.skeleton');
  }

  async count(): Promise<number> {
    await this.waitForFullyLoaded();
    return await this.products.count();
  }

  getProductByName(name: string): Locator {
    return this.products.filter({
      hasText: name,
    });
  }

  getAllProducts(): Locator {
    return this.products;
  }

  async getAllNames(): Promise<string[]> {
    await this.waitForFullyLoaded();
    return await this.page.getByTestId('product-name').allInnerTexts();
  }

  async getAllPrices(): Promise<string[]> {
    await this.waitForFullyLoaded();
    return await this.page.getByTestId('product-price').allInnerTexts();
  }

  async getAllPricesAsNumbers(): Promise<number[]> {
    const prices = await this.getAllPrices();
    return prices.map((p) => parseFloat(p.replace('$', '')));
  }

  async openProduct(name: string) {
    const product = this.getProductByName(name);
    await product.click();
  }

  async expectProductVisible(name: string) {
    await expect(this.getProductByName(name)).toBeVisible();
  }

  async expectSortedByPriceAscending() {
    const prices = await this.getAllPricesAsNumbers();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async getCo2Rating(name: string): Promise<string> {
    await this.waitForFullyLoaded();
    const product = this.getProductByName(name);
    const activeRating = product.locator(
      '[data-test="co2-rating-badge"] .co2-letter.active',
    );
    return (await activeRating.textContent())?.trim() ?? '';
  }

  async isOutOfStock(name: string): Promise<boolean> {
    const product = this.getProductByName(name);
    const outOfStock = product.getByTestId('out-of-stock');
    return await outOfStock.isVisible();
  }

  async waitForFullyLoaded() {
    await this.loadingSkeletons
      .first()
      .waitFor({ state: 'detached', timeout: 10_000 })
      .catch(() => {
        // Ignore error if skeletons never appeared
      });
    await this.products.first().waitFor({ state: 'visible', timeout: 10_000 });
  }
}
