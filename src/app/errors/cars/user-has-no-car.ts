import { HttpException, HttpStatus } from '@nestjs/common';

export class UserHasNoCarException extends HttpException {
  constructor() {
    super(
      { message: 'User has no cars', type: 'user_has_no_cars' },
      HttpStatus.OK,
    );
  }
}
