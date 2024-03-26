import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'random@example.com',
  })
    email: string;
}
