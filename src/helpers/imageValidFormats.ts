import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidFormats {
  protected validFormats = [
    'jpg',
    'png',
    'jpeg',
    'webp',
    'svg',
    'tiff',
    'bmp',
    'ico',
    'heic',
    'heif',
    'avif',
  ];

  public getFormat(imageUrl: string): string {
    const url = imageUrl.split('.').pop();

    const format = url?.split('?')[0];

    return format;
  }

  public isValidFormat(format: string): boolean {
    return this.validFormats.includes(format);
  }

  public getValidFormats(): string[] {
    return this.validFormats;
  }
}
