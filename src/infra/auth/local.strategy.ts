import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaAuthenticationRepository } from '@infra/database/prisma/repositories/authentication/prisma-authentication-repository';
import { WrongEmailPasswordError } from '@app/errors/users/wrong-email-password';
import { Authentication } from '@app/entities/authentication/authentication';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: PrismaAuthenticationRepository) {
    super({ usernameField: 'email' });
  }

  async validate(userRequest: Authentication): Promise<any> {
    const user = await this.authService.validate(userRequest);

    if (!user) {
      throw new WrongEmailPasswordError();
    }
    return user;
  }
}
