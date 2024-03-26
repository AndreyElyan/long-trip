import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundError extends HttpException {
  constructor() {
    super(
      { message: 'Car not found', type: 'car_not_found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
