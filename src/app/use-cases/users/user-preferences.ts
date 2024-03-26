import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/users-repository';

import { ValidFormats } from '@helpers/imageValidFormats';
import { UserNotFoundError } from '../../errors/users/user-not-found';

export interface UsersPreferencesRequest {
  id: string;
  conversation?: boolean;
  music?: boolean;
  smoking?: boolean;
  pets?: boolean;
  hadVaccines?: boolean;
  eatFood?: boolean;
}

@Injectable()
export class UsersPreferences {
  constructor(
    private usersRepository: UsersRepository,
    private validFormat: ValidFormats,
  ) {}

  async setPreferences(body: UsersPreferencesRequest) {
    const {
      id, conversation, music, smoking, pets, hadVaccines, eatFood,
    }
      = body;

    const userExists = await this.usersRepository.getUserById(id);

    if (!userExists) throw new UserNotFoundError();

    await this.usersRepository.updatePreferences(
      id,
      conversation,
      music,
      smoking,
      pets,
      hadVaccines,
      eatFood,
    );
  }

  async getPreferences(id: string) {
    const userExists = await this.usersRepository.getUserById(id);

    if (!userExists) throw new UserNotFoundError();

    const preferences = await this.usersRepository.findPreferencesByUserId(id);

    return preferences;
  }
}
