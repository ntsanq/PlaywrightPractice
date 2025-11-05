import { mergeTests, expect } from '@playwright/test';
import { pageFixtures } from './pages.fixture';
import { userFixtures } from '@/fixtures/user.fixture';

export const test = mergeTests(pageFixtures, userFixtures);
export { expect };
