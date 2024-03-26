import { UserInformation } from '@app/entities/users/user-information/user-information';

export class UserInformationViewModel {
  static toResponse(user: UserInformation) {
    return {
      id: user.id,
      email: user.email,
      name: `${user.name} ${user.lastName}`,
    };
  }
}
