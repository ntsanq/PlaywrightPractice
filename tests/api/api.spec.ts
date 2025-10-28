import { expect, test } from '@playwright/test';

const api = 'https://api.practicesoftwaretesting.com';

test('GET /products', async ({ request }) => {
  const response = await request.get(api + '/products');

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBe(9);
});

// test('POST /login', async ({ request }) => {
//   const loginData = {
//     email: 'dfasdf@mdf.com',
//     password: 'welcomse',
//   };
//
//   const response = await request.get(api + '/users/login', {
//     data: loginData,
//   });
//   expect(response.status()).toBe(200);
//   const body = await response.json();
//   expect(body.data.length).toBe(9);
// });

test.describe('POST /register', () => {
  test('should register a new user successfully', async ({ request }) => {
    const registerData = {
      first_name: 'Sang',
      last_name: 'Nguyen',
      dob: '2000-01-02',
      phone: '0954444555',
      email: `sang${Date.now()}@example.com`,
      password: '52eZi88pgNBU!E',
      address: {
        street: '213424dfasdf',
        city: 'fasd',
        state: 'adf',
        country: 'AD',
        postal_code: '23423',
      },
    };

    const response = await request.post(api + '/users/register', {
      data: registerData,
    });
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.email).toBe(registerData.email);
    expect(body.first_name).toBe(registerData.first_name);
  });

  test('should fail when email already exists', async ({ request }) => {
    const existingEmail = 'sang@gmail.com';

    const payload = {
      first_name: 'Sang',
      last_name: 'Nguyen',
      dob: '2000-01-02',
      phone: '0954444555',
      email: existingEmail,
      password: '52eZi88pgNBU!E',
      address: {
        street: '213424dfasdf',
        city: 'fasd',
        state: 'adf',
        country: 'AD',
        postal_code: '23423',
      },
    };

    const response = await request.post(api + '/users/register', {
      data: payload,
    });
    expect(response.status()).toBe(422);

    const body = await response.json();
    expect(body).toHaveProperty('email');
    expect(body.email[0]).toContain(
      'A customer with this email address already exists',
    );
  });
});
