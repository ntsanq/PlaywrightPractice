import { Locator, Page } from '@playwright/test';

export class FilterPanel {
  readonly root: Locator;

  readonly sortSelect: Locator;
  readonly priceRangeSlider: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchResetButton: Locator;
  readonly categoryCheckboxes: Locator;
  readonly brandCheckboxes: Locator;
  readonly ecoFriendlyCheckbox: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('filters');
    this.sortSelect = this.root.getByTestId('sort');
    this.priceRangeSlider = this.root.locator('ngx-slider');
    this.searchInput = this.root.getByTestId('search-query');
    this.searchSubmitButton = this.root.getByTestId('search-submit');
    this.searchResetButton = this.root.getByTestId('search-reset');
    this.categoryCheckboxes = this.root.locator('input[name="category_id"]');
    this.brandCheckboxes = this.root.locator('input[name="brand_id"]');
    this.ecoFriendlyCheckbox = this.root.getByTestId('eco-friendly-filter');
  }

  async sortBy(optionLabel: string) {
    await this.sortSelect.selectOption({ label: optionLabel });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchSubmitButton.click();
  }

  async resetSearch() {
    await this.searchResetButton.click();
  }

  async toggleCategory(categoryTestId: string) {
    await this.root.getByTestId(categoryTestId).check();
  }

  async toggleBrand(brandTestId: string) {
    await this.root.getByTestId(brandTestId).check();
  }

  async toggleEcoFriendly() {
    await this.ecoFriendlyCheckbox.click();
  }
}
