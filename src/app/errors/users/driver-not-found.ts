import { HttpException, HttpStatus } from '@nestjs/common';

export class DriverNotFoundError extends HttpException {
  constructor() {
    super(
      { message: 'Driver Not Found', type: 'driver_not_found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
