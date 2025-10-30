import { Locator, Page } from '@playwright/test';
import { FilterPanelComponent } from './filter-panel.component';

export class FooterComponent {
  readonly root: Locator;
  readonly githubLink: Locator;
  readonly supportLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly photographerLink: Locator;
  readonly photoSourceLink: Locator;

  constructor(page: Page) {
    this.root = page.locator('.container-fluid.text-center.bg-light');
    this.githubLink = this.root.getByRole('link', {
      name: 'GitHub repo',
    });
    this.supportLink = this.root.getByRole('link', {
      name: 'Support this project',
    });
    this.privacyPolicyLink = this.root.getByRole('link', {
      name: 'Privacy Policy',
    });
    this.photographerLink = this.root.getByRole('link', {
      name: 'Barn Images',
    });
    this.photoSourceLink = this.root.getByRole('link', {
      name: 'Unsplash',
    });
  }

  async openPrivacyPolicy() {
    await this.privacyPolicyLink.click();
  }
}
