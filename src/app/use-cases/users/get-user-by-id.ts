import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@app/repositories/users-repository';
import { Users } from '@prisma/client';

@Injectable()
export class GetUserById {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<Users> | null {
    const user = await this.usersRepository.getUserById(id);

    return user;
  }
}
