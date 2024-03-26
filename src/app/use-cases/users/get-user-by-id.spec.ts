import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { GetUserById } from './get-user-by-id';

describe('User Information', () => {
  it('should be able to get a user by id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserById = new GetUserById(usersRepository);

    const user = await getUserById.execute(
      'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    );

    expect(usersRepository.user_response.id).toEqual(user.id);
  });
});
