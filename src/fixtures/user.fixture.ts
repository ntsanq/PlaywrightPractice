import { test } from '@playwright/test';
import fs from 'fs';
import { UserModel } from '@/models';

export const userFixtures = test.extend<{
  loggedUser: UserModel;
}>({
  loggedUser: async ({}, use) =>
    await use(JSON.parse(fs.readFileSync('.auth/auth.meta.json', 'utf-8'))),
});
