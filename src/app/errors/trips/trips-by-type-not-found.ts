import { HttpException, HttpStatus } from '@nestjs/common';

export class TripsByTypeNotFound extends HttpException {
  constructor() {
    super(
      { message: 'Trips not found', type: 'trips_not_found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
