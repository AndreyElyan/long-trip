import { UserInformation } from '@app/entities/users/user-information/user-information';
import { UserPassword } from '@app/entities/users/user-information/user-password';
import { PrismaUsersMapper } from './prisma-users-mapper';

describe('PrismaUsersMapper', () => {
  it('should be defined', () => {
    expect(PrismaUsersMapper).toBeDefined();
  });

  it('should be able to map a user to a request', async () => {
    const user = new UserInformation({
      name: 'Ronaldo',
      lastName: 'Nazario',
      imageUrl: '',
      cellPhone: '512002-2002',
      dateOfBirth: '01/01/2002',
      email: 'r9@gmail.com',
      gender: 'Masculino',
      password: new UserPassword('12345678'),
    });

    const mappedUser = await PrismaUsersMapper.toRequest(user);

    expect(mappedUser).toEqual({
      id: user.id,
      imageUrl: user.imageUrl,
      cellPhone: user.cellPhone,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      password: expect.any(String),
      gender: user.gender,

      dateOfBirth: user.dateOfBirth,
    });
  });
});
