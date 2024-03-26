import { UserInformation } from '@app/entities/users/user-information/user-information';
import { UsersRepository } from '@app/repositories/users-repository';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { UpdateUserRequest } from '@app/use-cases/users/update-user';

import { Users } from '@prisma/client';

export class InMemoryUsersRepository implements UsersRepository {
  public users: UserInformation[] = [];

  public user_response: Users = {
    id: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    email: 'andrey@gmail.com',
    name: 'Andrey',
    lastName: 'Silveira',
    dateOfBirth: '19/07/1930',
    gender: 'Masculino',
    password: 'password',
    cellPhone: '51985809513',
    conversation: true,
    music: true,
    smoking: true,
    pets: true,
    hadVaccines: true,
    eatFood: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: '',
    resetToken: 123456,
    resetTokenExpiry: new Date(),
  };

  get(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: null): Promise<Users | null> {
    const user = this.user_response.email === email ? this.user_response : null;

    return user ? Promise.resolve(user) : Promise.resolve(null);
  }

  getUserById(id: string): Promise<Users> {
    const user = this.user_response.id === id ? this.user_response : null;

    return user ? Promise.resolve(user) : Promise.resolve(null);
  }

  async create(user: UserInformation) {
    this.users.push(user);
  }

  updateResetToken(
    email: string,
    resetToken: number,
    resetTokenExpiry: Date,
  ): Promise<void> {
    const user = this.user_response.email === email ? this.user_response : null;

    if (!user) {
      throw new UserNotFoundError();
    }

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    return Promise.resolve();
  }

  update(id: string, body: UpdateUserRequest): Promise<Users> {
    let user = this.user_response.id === id ? this.user_response : null;

    if (!user) throw new UserNotFoundError();

    user = {
      ...user,
      ...body,
    };

    return Promise.resolve(user);
  }

  updatePreferences(
    id: string,
    conversation?: boolean,
    music?: boolean,
    smoking?: boolean,
    pets?: boolean,
    hadVaccines?: boolean,
    eatFood?: boolean,
  ): Promise<void> {
    const user = this.user_response.id === id ? this.user_response : null;

    if (!user) {
      throw new UserNotFoundError();
    }

    user.conversation = conversation;
    user.music = music;
    user.smoking = smoking;
    user.pets = pets;
    user.hadVaccines = hadVaccines;
    user.eatFood = eatFood;

    return Promise.resolve();
  }

  findPreferencesByUserId(id: string) {
    const user = this.user_response.id === id ? this.user_response : null;

    if (!user) {
      throw new UserNotFoundError();
    }

    const {
      conversation, music, smoking, pets, hadVaccines, eatFood,
    } = user;

    return Promise.resolve({
      conversation,
      music,
      smoking,
      pets,
      hadVaccines,
      eatFood,
    });
  }
}
