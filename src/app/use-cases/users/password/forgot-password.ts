import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/users-repository';
import { UserNotFoundError } from '@app/errors/users/user-not-found';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  resetToken: number;
  resetTokenExpiry: Date;
}

@Injectable()
export class ForgotPassword {
  constructor(private usersRepository: UsersRepository) {}

  async execute(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const emailExists = await this.usersRepository.findByEmail(req.email);

    if (!emailExists) {
      throw new UserNotFoundError();
    }

    const resetToken = Math.floor(Math.random() * 900000) + 100000;

    const resetTokenExpiry = new Date();
    resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);

    await this.usersRepository.updateResetToken(
      req.email,
      resetToken,
      resetTokenExpiry,
    );

    return { resetToken, resetTokenExpiry };
  }
}
