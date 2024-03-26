import { ValidFormats } from '@helpers/imageValidFormats';
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { Update } from './update-user';

describe('User Information', () => {
  it('should be able to update user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const validFormats = new ValidFormats();
    const updateUser = new Update(usersRepository, validFormats);
    const body = {
      email: 'valid_email@email.com',
    };
    const user = usersRepository.user_response;

    if (!user) throw new Error('User not found');

    const updatedUser = await updateUser.execute(user.id, body);

    expect(updatedUser).toEqual({
      ...user,
      ...body,
    });
  });
});
