import { UserInformation } from './user-information';
import { UserPassword } from './user-password';

describe('User Information', () => {
  it('should be able to create a new user', () => {
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

    expect(user).toBeTruthy();
  });
});
