import * as bcrypt from 'bcrypt';

import { Authentication } from '@app/entities/authentication/authentication';
import { jwtConstants } from '@app/entities/authentication/constants';

import { AuthenticationRepository } from '@app/repositories/authentication-repository';
import { WrongEmailPasswordError } from '@app/errors/users/wrong-email-password';

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaAuthenticationRepository
implements AuthenticationRepository {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public id = '';

  async validate(userRequest: Authentication): Promise<any> {
    const { email, password } = userRequest;

    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new WrongEmailPasswordError();
    }

    const isMatch = await bcrypt.compare(password.value, user.password);

    if (isMatch) {
      this.id = user.id;
      return this.login(user.email);
    }
    throw new WrongEmailPasswordError();
  }

  async login(email: string) {
    const payload = { email, sub: this.id };
    return {
      id: this.id,
      expiresIn: '30d',
      access_token: `Bearer ${this.jwtService.sign(
        { payload },
        { secret: jwtConstants().secret, expiresIn: '30d' },
      )}`,
    };
  }
}
