import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor() {
    super(
      { message: 'User Not Found', type: 'user_not_found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
