import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserPassword } from '@app/entities/users/user-information/user-password';

import { AuthenticationRepository } from '@app/repositories/authentication-repository';
import { Authentication } from '@app/entities/authentication/authentication';
import { Users } from '@prisma/client';

interface ValidateLoginRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateLogin {
  constructor(private authenticationRepository: AuthenticationRepository) {}

  async execute(request: ValidateLoginRequest): Promise<Users | null> {
    const { email, password } = request;

    const user = new Authentication({
      email,
      password: new UserPassword(password),
    });

    const userResponse = await this.authenticationRepository.validate(user);

    if (!userResponse) {
      throw new UnauthorizedException();
    }
    return userResponse;
  }
}
