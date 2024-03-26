import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTripUserDto {
  @ApiProperty()
  @IsString()
    tripId: string;

  @ApiProperty()
  @IsString()
    passengerId: string;
}
