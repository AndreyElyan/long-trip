import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CarResponse {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
    id: number;

  @IsString()
  @ApiProperty({
    example: '5f9f1c9b0b9b9c0b9b9b9b9b',
  })
    userId: string;

  @IsString()
  @ApiProperty({
    example: 'Civic',
  })
    model: string;

  @IsString()
  @ApiProperty({
    example: 'Honda',
  })
    make: string;

  @IsString()
  @ApiProperty({
    example: '2020',
  })
    year: string;

  @IsString()
  @ApiProperty({
    example: 'Black',
  })
    color: string;

  @IsString()
  @ApiProperty({
    example:
      'https://firebasestorage.googleapis.com/v0/b/long-trip-4985d.appspot.com/o/profile-image%2Fc89a28ab-e8b0-4026-b662-9fe8912397f69219004419421042296.jpg',
  })
    imageUrl: string;

  @IsString()
  @ApiProperty({
    example: 'ABC1234',
  })
    licensePlate: string;
}
