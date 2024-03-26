import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveUserFromTripBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5f9f1c9b0b9b9c0b9b9b9b9b',
  })
    passengerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5f9f1c9b1b9b9c0b9b9b9b9b',
  })
    tripId: string;
}
