import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/users-repository';
import { Users } from '@prisma/client';
import { ValidFormats } from '@helpers/imageValidFormats';
import { UserNotFoundError } from '../../errors/users/user-not-found';
import { InvalidImageFormatError } from '../../errors/users/invalid-image-format';

export interface UpdateUserRequest {
  name?: string;
  lastName?: string;
  imageUrl?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  cellPhone?: string;
  email?: string;
}

@Injectable()
export class Update {
  constructor(
    private usersRepository: UsersRepository,
    private validFormat: ValidFormats,
  ) {}

  async execute(id: string, body: UpdateUserRequest): Promise<Users> | null {
    const userExists = await this.usersRepository.getUserById(id);

    if (!userExists) throw new UserNotFoundError();

    if (body.imageUrl) {
      const imageFormat = this.validFormat.getFormat(body.imageUrl);

      if (!this.validFormat.isValidFormat(imageFormat)) throw new InvalidImageFormatError();
    }

    const updatedUser = await this.usersRepository.update(id, {
      ...userExists,
      ...body,
    });

    return updatedUser;
  }
}
