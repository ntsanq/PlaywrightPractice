import { Page } from '@playwright/test';
import {
  FilterPanelComponent,
  FooterComponent,
  NavMenuComponent,
  NotificationBarComponent,
  ProductListComponent,
} from '@/components';
import { BasePage } from '@/pages/base.page';

export class HomePage extends BasePage {
  readonly PATH = '/';
  readonly TITLE = 'Practice Software Testing - Toolshop - v5.0';

  readonly notificationBar: NotificationBarComponent;
  readonly navMenu: NavMenuComponent;
  readonly filters: FilterPanelComponent;
  readonly productList: ProductListComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.notificationBar = new NotificationBarComponent(page);
    this.navMenu = new NavMenuComponent(page);
    this.filters = new FilterPanelComponent(page);
    this.productList = new ProductListComponent(page);
    this.footer = new FooterComponent(page);
  }

  async goto() {
    await super.goto();
  }
}
