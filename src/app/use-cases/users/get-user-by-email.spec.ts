import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserNotFoundError } from '../../errors/users/user-not-found';
import { GetUserByEmail } from './get-user-by-email';

describe('GetUserByEmail', () => {
  it('should return a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserByEmail = new GetUserByEmail(usersRepository);
    const user = await getUserByEmail.execute('andrey@gmail.com');

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('dateOfBirth');
  });

  it('should throw an error if user not found', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserByEmail = new GetUserByEmail(usersRepository);

    await expect(getUserByEmail.execute('random@example.com')).rejects.toThrow(
      new UserNotFoundError(),
    );
  });
});
