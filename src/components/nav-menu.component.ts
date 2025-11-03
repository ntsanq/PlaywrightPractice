import { Locator, Page } from '@playwright/test';

export class NavMenuComponent {
  readonly root: Locator;

  readonly homeLink: Locator;
  readonly accountMenuLink: Locator;
  readonly myMessagesDropItem: Locator;

  readonly contactLink: Locator;
  readonly signInLink: Locator;

  readonly categoriesToggle: Locator;
  readonly categoryDropdown: Locator;
  readonly handToolsLink: Locator;
  readonly powerToolsLink: Locator;
  readonly otherLink: Locator;
  readonly specialToolsLink: Locator;
  readonly rentalsLink: Locator;

  readonly languageButton: Locator;
  readonly languageDropdown: Locator;
  readonly langDE: Locator;
  readonly langEN: Locator;
  readonly langES: Locator;
  readonly langFR: Locator;
  readonly langNL: Locator;
  readonly langTR: Locator;

  constructor(page: Page) {
    this.root = page.locator('#navbarSupportedContent');

    this.homeLink = this.root.getByTestId('nav-home');
    this.accountMenuLink = this.root.getByTestId('nav-menu');
    this.myMessagesDropItem = this.root.getByTestId('nav-my-messages');

    this.contactLink = this.root.getByTestId('nav-contact');
    this.signInLink = this.root.getByTestId('nav-sign-in');

    this.categoriesToggle = this.root.getByTestId('nav-categories');
    this.categoryDropdown = this.root.locator(
      '.dropdown-menu[aria-label="nav-categories"]',
    );
    this.handToolsLink = this.root.getByTestId('nav-hand-tools');
    this.powerToolsLink = this.root.getByTestId('nav-power-tools');
    this.otherLink = this.root.getByTestId('nav-other');
    this.specialToolsLink = this.root.getByTestId('nav-special-tools');
    this.rentalsLink = this.root.getByTestId('nav-rentals');

    this.languageButton = this.root.getByTestId('language-select');
    this.languageDropdown = this.root.locator('#dropdown-animated');
    this.langDE = this.languageDropdown.getByTestId('lang-de');
    this.langEN = this.languageDropdown.getByTestId('lang-en');
    this.langES = this.languageDropdown.getByTestId('lang-es');
    this.langFR = this.languageDropdown.getByTestId('lang-fr');
    this.langNL = this.languageDropdown.getByTestId('lang-nl');
    this.langTR = this.languageDropdown.getByTestId('lang-tr');
  }

  async navigateToMyMessages() {
    await this.accountMenuLink.click();
    await this.myMessagesDropItem.click();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.accountMenuLink.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.accountMenuLink.innerText();
      return !!text.trim();
    } catch {
      return false;
    }
  }

  async navigateToHome() {
    await this.homeLink.click();
  }

  async navigateToContact() {
    await this.contactLink.click();
  }

  async navigateToSignIn() {
    await this.signInLink.click();
  }

  async navigateToCategories() {
    if (!(await this.categoryDropdown.isVisible())) {
      await this.categoriesToggle.click();
    }
  }

  async selectCategory(
    name: 'Hand Tools' | 'Power Tools' | 'Other' | 'Special Tools' | 'Rentals',
  ) {
    await this.navigateToCategories();

    const categoryMap = {
      'Hand Tools': this.handToolsLink,
      'Power Tools': this.powerToolsLink,
      Other: this.otherLink,
      'Special Tools': this.specialToolsLink,
      Rentals: this.rentalsLink,
    };

    const link = categoryMap[name];
    await link.click();
  }

  async openLanguageMenu() {
    if (!(await this.languageDropdown.isVisible())) {
      await this.languageButton.click();
    }
  }

  async selectLanguage(langCode: 'DE' | 'EN' | 'ES' | 'FR' | 'NL' | 'TR') {
    await this.openLanguageMenu();

    const langMap = {
      DE: this.langDE,
      EN: this.langEN,
      ES: this.langES,
      FR: this.langFR,
      NL: this.langNL,
      TR: this.langTR,
    };

    const option = langMap[langCode];
    await option.click();
  }
}
