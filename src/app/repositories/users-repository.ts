import { UpdateUserBody } from '@infra/http/dtos/users/update-user-body';
import { Users } from '@prisma/client';
import { UserInformation } from '../entities/users/user-information/user-information';

export abstract class UsersRepository {
  abstract create(user: UserInformation): Promise<void>;

  abstract getUserById(id: string): Promise<Users> | null;

  abstract findByEmail(email: string): Promise<Users | null>;

  abstract updateResetToken(
    email: string,
    resetToken: number,
    resetTokenExpiry: Date,
  ): Promise<void>;

  abstract update(id: string, body: UpdateUserBody): Promise<Users> | null;

  abstract updatePreferences(
    id: string,
    conversation?: boolean,
    music?: boolean,
    smoking?: boolean,
    pets?: boolean,
    hadVaccines?: boolean,
    eatFood?: boolean,
  ): Promise<void>;

  abstract findPreferencesByUserId(id: string);
}
