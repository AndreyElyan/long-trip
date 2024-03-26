import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe('User Information', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      imageUrl: 'https://example',
      name: 'Ronaldo',
      lastName: 'Nazario',
      cellPhone: '512002-2002',
      dateOfBirth: '01/01/2002',
      email: 'r9@gmail.com',
      gender: 'Masculino',
      password: '12121212121212',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
