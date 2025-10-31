import { APIResponse, expect, test } from '@playwright/test';
import { UserFactory } from '@/datafactory';
import fs from 'fs';

const api = 'https://api.practicesoftwaretesting.com';

test('GET /products', async ({ request }) => {
  const response = await request.get(api + '/products');

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBe(9);
});

test('POST /login', async ({ request }) => {
  const loginData = JSON.parse(
    fs.readFileSync('.auth/auth.meta.json', 'utf-8'),
  );

  const response = await request.post(api + '/users/login', {
    data: {
      email: loginData.email,
      password: loginData.password,
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body['access_token']).not.toBeNull();
});

test.describe('POST /register', () => {
  test('should register a new user successfully', async ({ request }) => {
    const registerData = UserFactory.generateRegisterPayload();

    const response = await request.post(api + '/users/register', {
      data: registerData,
    });
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.email).toBe(registerData.email);
    expect(body.first_name).toBe(registerData['first-name']);
  });

  test('should fail when email already exists', async ({ request }) => {
    const payload = UserFactory.generateRegisterPayload();
    payload.email = 'sang@gmail.com';

    const assertEmailExistsError = async (response: APIResponse) => {
      const body = await response.json();
      expect(response.status()).toBe(422);
      expect(body).toHaveProperty('email');
      expect(body.email[0]).toContain(
        'A customer with this email address already exists.',
      );
    };

    const firstResponse = await request.post(api + '/users/register', {
      data: payload,
    });
    if (firstResponse.status() === 201) {
      const secondResponse = await request.post(api + '/users/register', {
        data: payload,
      });
      await assertEmailExistsError(secondResponse);
    } else {
      await assertEmailExistsError(firstResponse);
    }
  });
});
