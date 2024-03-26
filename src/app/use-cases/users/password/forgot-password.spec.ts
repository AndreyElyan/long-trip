import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { ForgotPassword } from './forgot-password';

describe('ForgotPassword', () => {
  const inMemoryUsersRepository = new InMemoryUsersRepository();
  const forgotPassword = new ForgotPassword(inMemoryUsersRepository);
  it('should be defined', () => {
    expect(forgotPassword).toBeDefined();
  });

  it('should be able to send a email on forgot password', async () => {
    const data = await forgotPassword.execute({
      email: 'andrey@gmail.com',
    });

    expect(data).toBeInstanceOf(Object);

    expect(data).toHaveProperty('resetToken');
    expect(data).toHaveProperty('resetTokenExpiry');

    expect(data.resetTokenExpiry).toBeInstanceOf(Date);
  });

  it('should not be able to send a email on forgot password', async () => {
    await expect(
      forgotPassword.execute({
        email: 'random@example.com',
      }),
    ).rejects.toThrow();
  });
});
