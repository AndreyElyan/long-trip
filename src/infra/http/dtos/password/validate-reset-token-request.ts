import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidateResetTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'random@example.com',
  })
    email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 102040,
  })
    resetToken: number;
}
