import { Users } from '@prisma/client';

export class UserDataViewModel {
  static toResponse(user: Users) {
    return {
      id: user.id,
      email: user.email,
      imageUrl: user.imageUrl,
      name: `${user.name} ${user.lastName}`,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      cellPhone: user.cellPhone,
    };
  }

  static toProfile(user: Users) {
    return {
      id: user.id,
      email: user.email,
      imageUrl: user.imageUrl,
      name: `${user.name} ${user.lastName}`,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      cellPhone: user.cellPhone,
      conversation: user.conversation,
      music: user.music,
      smoking: user.smoking,
      pets: user.pets,
      hadVaccines: user.hadVaccines,
      eatFood: user.eatFood,
    };
  }
}
