import { hashPassword } from './hash-password';

describe('HashPassword', () => {
  it('should be defined', () => {
    expect(hashPassword).toBeDefined();
  });

  it('should be able to hash a password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });
});
