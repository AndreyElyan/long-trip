import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserPreferencesBody {
  @IsNotEmpty()
  @ApiProperty({
    example: 'asfoasdz',
  })
    id: string;

  @ApiProperty({ example: true })
    conversation?: boolean;

  @ApiProperty({ example: true })
    music?: boolean;

  @ApiProperty({ example: true })
    smoking?: boolean;

  @ApiProperty({ example: true })
    pets?: boolean;

  @ApiProperty({ example: true })
    hadVaccines?: boolean;

  @ApiProperty({ example: true })
    eatFood?: boolean;
}
