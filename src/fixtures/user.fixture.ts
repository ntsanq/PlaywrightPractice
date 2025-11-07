import {
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  test,
} from '@playwright/test';
import fs from 'fs';
import { UserModel } from '@/models';

export const userFixtures = test.extend<
  {}, // test-scoped fixtures
  {
    loggedUser: UserModel;
  } // worker-scoped fixtures
>({
  loggedUser: [
    async ({}: PlaywrightWorkerArgs & PlaywrightWorkerOptions, use) =>
      await use(JSON.parse(fs.readFileSync('.auth/auth.meta.json', 'utf-8'))),
    { scope: 'worker' },
  ],
});
