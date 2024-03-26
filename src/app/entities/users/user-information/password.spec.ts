import { UserPassword } from './user-password';

describe('User Password', () => {
  it('should be able to create a user password', () => {
    const password = new UserPassword('123456789');

    expect(password).toBeTruthy();
  });

  it('should not be able to create a user password with less than 8 length', () => {
    expect(() => new UserPassword('123')).toThrow();
  });
});
