import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '10204060',
  })
    password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '9a4b98c3-5b5f-4c30-b7b7-388e2554c',
  })
    id: string;
}
