import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyOnTrip extends HttpException {
  constructor() {
    super(
      { message: 'The passenger is already on the trip.', type: 'passenger-already-on-trip' },
      HttpStatus.CONFLICT,
    );
  }
}
