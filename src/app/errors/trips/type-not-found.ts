import { HttpException, HttpStatus } from '@nestjs/common';

export class TypeNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'Type does not exist, must be either DRIVER or RIDE.',
        type: 'type_not_found',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
