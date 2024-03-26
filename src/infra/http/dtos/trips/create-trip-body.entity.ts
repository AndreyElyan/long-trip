import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Porto Alegre, RS',
  })
    origin: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: -30.0346471,
  })
    lat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: -30.0346471,
  })
    lng: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: -30.0346471,
  })
    latDest: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: -30.0346471,
  })
    lngDest: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Florianópolis, SC',
  })
    destination: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '19/07/1930',
  })
    date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '19:00',
  })
    time: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 10.0,
  })
    cost: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 4,
  })
    seats: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5f9f1c9b0b9b9c0b9b9b9b9b',
  })
    driverId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
    carInfoId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Com paradas nos principais pontos turísticos.',
  })
    description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'DRIVER',
  })
    tripType: string;
}
