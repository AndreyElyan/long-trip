import { HttpException, HttpStatus } from '@nestjs/common';

export class DriverCannotBePassenger extends HttpException {
  constructor() {
    super(
      { message: 'The driver cannot be assigned as a passanger on the same trip.', type: 'same_user_driver_id' },
      HttpStatus.CONFLICT,
    );
  }
}
