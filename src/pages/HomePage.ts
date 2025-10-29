import { Page } from '@playwright/test';
import {
  FilterPanel,
  Footer,
  NavMenu,
  NotificationBar,
  ProductList,
} from '../components';

export class HomePage {
  readonly page: Page;

  // Component instances
  readonly notificationBar: NotificationBar;
  readonly navMenu: NavMenu;
  readonly filters: FilterPanel;
  readonly productList: ProductList;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.notificationBar = new NotificationBar(page);
    this.navMenu = new NavMenu(page);
    this.filters = new FilterPanel(page);
    this.productList = new ProductList(page);
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
