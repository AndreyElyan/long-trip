import { Injectable } from '@nestjs/common';
import { UserInformation } from 'src/app/entities/users/user-information/user-information';
import { UpdateUserBody } from '@infra/http/dtos/users/update-user-body';
import { UsersRepository } from '@app/repositories/users-repository';
import { Users } from '@prisma/client';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { InvalidToken } from '@app/errors/password/invalid-token';
import { TokenExpired } from '@app/errors/password/token-expired';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@app/entities/authentication/constants';
import { hashPassword } from '@helpers/hash-password';
import { PrismaUsersMapper } from '../../mappers/users/prisma-users-mapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(user: UserInformation): Promise<void> {
    const raw = await PrismaUsersMapper.toRequest(user);

    await this.prismaService.users.create({
      data: raw,
    });
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async updateResetToken(
    email: string,
    resetToken,
    resetTokenExpiry,
  ): Promise<void> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.prismaService.users.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });
  }

  async validateResetToken(email: string, resetToken: number) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (resetToken !== user.resetToken) {
      throw new InvalidToken();
    }

    if (user.resetTokenExpiry < new Date()) {
      throw new TokenExpired();
    }

    const payload = { email, sub: user.id };

    return {
      id: user.id,
      expiresIn: '10m',
      access_token: `Bearer ${this.jwtService.sign(
        { payload },
        { secret: jwtConstants().secret, expiresIn: '10m' },
      )}`,
    };
  }

  async resetPassword(id: string, password: string) {
    await this.getUserById(id);
    const hashedPassword = await hashPassword(password);

    await this.prismaService.users.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async update(id: string, body: UpdateUserBody): Promise<Users> {
    const user = await this.getUserById(id);

    if (!user) throw new UserNotFoundError();

    const updatedUser = {
      ...user,
      ...body,
    };

    const result = await this.prismaService.users.update({
      where: { id },
      data: updatedUser,
    });

    return result;
  }

  async updatePreferences(
    id: string,
    conversation?: boolean,
    music?: boolean,
    smoking?: boolean,
    pets?: boolean,
    hadVaccines?: boolean,
    eatFood?: boolean,
  ): Promise<void> {
    const user = await this.getUserById(id);

    if (!user) throw new UserNotFoundError();

    await this.prismaService.users.update({
      where: { id },
      data: {
        conversation,
        music,
        smoking,
        pets,
        hadVaccines,
        eatFood,
      },
    });
  }

  async findPreferencesByUserId(id: string) {
    const user = await this.getUserById(id);

    if (!user) throw new UserNotFoundError();

    const {
      conversation, music, smoking, pets, hadVaccines, eatFood,
    } = user;

    const preferences = {
      conversation,
      music,
      smoking,
      pets,
      hadVaccines,
      eatFood,
    };

    return preferences;
  }
}
