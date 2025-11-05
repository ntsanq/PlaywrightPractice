import { faker } from '@faker-js/faker';
import { RegisterModel } from '@/models';

export class UserFactory {
  private static generateStrongPasswordByRegex(length = 12): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?';
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:,.<>?]).{8,}$/;

    let password = '';
    do {
      password = Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join('');
    } while (!pattern.test(password));

    return password;
  }

  static generateRegisterPayload(): RegisterModel {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const password = this.generateStrongPasswordByRegex(12);

    return {
      'first-name': firstName,
      first_name: firstName,
      'last-name': lastName,
      last_name: lastName,
      dob: faker.date
        .birthdate({ min: 18, max: 50, mode: 'age' })
        .toISOString()
        .split('T')[0],
      street: faker.location.streetAddress(),
      postal_code: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'VN',
      phone: faker.phone.number({ style: 'human' }),
      email,
      password: password,
    };
  }
}
