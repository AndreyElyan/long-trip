import { UserInformation } from '@app/entities/users/user-information/user-information';
import { hashPassword } from '@helpers/hash-password';

export class PrismaUsersMapper {
  static async toRequest(user: UserInformation) {
    const {
      name,
      lastName,
      dateOfBirth,
      gender,
      cellPhone,
      email,
      id,
      imageUrl,
      password,
    } = user;

    const hashedPassword = await hashPassword(password.value);

    return {
      id,
      name,
      lastName,
      password: hashedPassword,
      dateOfBirth,
      gender,
      cellPhone,
      email,
      imageUrl,
    };
  }
}
