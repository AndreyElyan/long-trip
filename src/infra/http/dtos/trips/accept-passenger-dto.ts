import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AcceptPassengerBody {
  @IsString()
  @ApiProperty({ example: '1' })
    tripId: string;

  @IsString()
  @ApiProperty({ example: '1' })
    passengerId: string;
}
