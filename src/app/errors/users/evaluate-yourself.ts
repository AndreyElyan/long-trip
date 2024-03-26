import { HttpException, HttpStatus } from '@nestjs/common';

export class EvaluateYourselfError extends HttpException {
  constructor() {
    super(
      {
        message: 'You cannot evaluate yourself',
        type: 'cannot_evaluate_yourself',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
