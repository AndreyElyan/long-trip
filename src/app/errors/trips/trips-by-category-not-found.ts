import { HttpException, HttpStatus } from '@nestjs/common';

export class TripsByCategoryNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'Trips with specified category not found',
        type: 'trips_not_found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
