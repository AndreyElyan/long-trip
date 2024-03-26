import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateEvaluationBody {
  @ApiProperty()
  @IsNumber()
    evaluation: number;

  @ApiProperty()
  @IsString()
    description: string;

  @ApiProperty()
  @IsString()
    tripId: string;

  @ApiProperty()
  @IsString()
    passengerId: string;

  @ApiProperty()
  @IsString()
    driverId: string;
}
