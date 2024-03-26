import {
  Body, Controller, Post, UseGuards, HttpStatus,
} from '@nestjs/common';

import { ForgotPassword } from '@app/use-cases/users/password/forgot-password';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/users/prisma-users-repository';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import Mail from '@infra/lib/Mail';
import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { ValidateResetTokenRequestDto } from '@infra/http/dtos/password/validate-reset-token-request';
import { ValidateResetTokenResponseDto } from '@infra/http/dtos/password/validate-reset-token-response';
import { ResetPasswordRequestDto } from '@infra/http/dtos/password/reset-password';
import { ForgotPasswordRequestDto } from '@infra/http/dtos/password/forgot-password';

@ApiTags('Password')
@Controller('password')
export class PasswordController {
  constructor(
    private forgotPassword: ForgotPassword,
    private prismaUsersRepository: PrismaUsersRepository,
  ) {}

  @Post('/forgot')
  @ApiOperation({ summary: 'Send a email on forgot password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email sent',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async forgot(@Body() { email }: ForgotPasswordRequestDto): Promise<void> {
    const data = await this.forgotPassword.execute({ email });

    if (data) {
      this.sendEmail(email, data.resetToken);
    }
  }

  @Post('validate-reset-token')
  @ApiOperation({ summary: 'Validate token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token validated',
    type: ValidateResetTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async validateResetToken(
  @Body() { email, resetToken }: ValidateResetTokenRequestDto,
  ) {
    return this.prismaUsersRepository.validateResetToken(
      email,
      resetToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/forgot/reset')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reseted',
  })
  async resetPassword(@Body() { id, password }: ResetPasswordRequestDto) {
    return this.prismaUsersRepository.resetPassword(id, password);
  }

  private async sendEmail(email: string, resetCode: number): Promise<void> {
    Mail.sendMail({
      to: email,
      subject: 'Password reset code',
      text: `Your password reset code is ${resetCode}`,
    });
  }
}
