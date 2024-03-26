import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidImageFormatError extends HttpException {
  constructor() {
    super(
      {
        message:
          'Invalid image format. Valid formats are: jpg, png, jpeg, webp, svg, tiff, bmp, ico, heic, heif, avif',
        type: 'invalid_image_format',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
