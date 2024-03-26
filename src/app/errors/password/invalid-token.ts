import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidToken extends HttpException {
  constructor() {
    super(
      { message: 'Invalid token', type: 'invalid_token' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
