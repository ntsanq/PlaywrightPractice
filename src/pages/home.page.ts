import { Page } from '@playwright/test';
import {
  FilterPanelComponent,
  FooterComponent,
  NavMenuComponent,
  NotificationBarComponent,
  ProductListComponent,
} from '../components';

export class HomePage {
  readonly page: Page;

  // Component instances
  readonly notificationBar: NotificationBarComponent;
  readonly navMenu: NavMenuComponent;
  readonly filters: FilterPanelComponent;
  readonly productList: ProductListComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.notificationBar = new NotificationBarComponent(page);
    this.navMenu = new NavMenuComponent(page);
    this.filters = new FilterPanelComponent(page);
    this.productList = new ProductListComponent(page);
    this.footer = new FooterComponent(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
