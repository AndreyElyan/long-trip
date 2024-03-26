import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordLengthError extends HttpException {
  constructor() {
    super(
      { message: 'Password length error', type: 'bad_request' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
