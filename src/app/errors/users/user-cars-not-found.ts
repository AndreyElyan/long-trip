import { HttpException, HttpStatus } from '@nestjs/common';

export class UserCarsNotFoundError extends HttpException {
  constructor() {
    super(
      { message: 'User cars not found', type: 'user_cars_not_found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
