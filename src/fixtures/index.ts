import { test as baseTest, expect } from '@playwright/test';
import { pageFixtures, PageFixtures } from './pages.fixture';

export type Fixtures = PageFixtures;

export const test = baseTest.extend<Fixtures>({
  ...pageFixtures,
});

export { expect };
