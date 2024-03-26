import { HttpException, HttpStatus } from '@nestjs/common';

export class SeatsFull extends HttpException {
  constructor() {
    super(
      { message: 'Seats full', type: 'seats-full' },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
