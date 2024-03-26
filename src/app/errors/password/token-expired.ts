import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenExpired extends HttpException {
  constructor() {
    super(
      { message: 'Expired Token', type: 'expired_token' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
