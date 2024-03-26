import { HttpException, HttpStatus } from '@nestjs/common';

export class DriverCannotBePassenger extends HttpException {
  constructor() {
    super(
      { message: 'The driver is not on this trip.', type: 'driver-not-found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
