import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@app/repositories/users-repository';
import { Users } from '@prisma/client';
import { UserNotFoundError } from '../../errors/users/user-not-found';

@Injectable()
export class GetUserByEmail {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string): Promise<Users> | null {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
