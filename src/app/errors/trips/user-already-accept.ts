import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyAccepted extends HttpException {
  constructor() {
    super(
      {
        message: 'User already accepted',
        type: 'user_already_accepted',
      },
      HttpStatus.CONFLICT,
    );
  }
}
