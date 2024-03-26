import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsError extends HttpException {
  constructor() {
    super(
      { message: 'Email Already Exists', type: 'email_not_available' },
      HttpStatus.CONFLICT,
    );
  }
}
