import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongEmailPasswordError extends HttpException {
  constructor() {
    super(
      {
        message: 'Email or Password is invalid',
        type: 'email_or_password_is_invalid',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
