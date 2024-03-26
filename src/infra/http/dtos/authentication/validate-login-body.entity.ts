import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateLoginBodyRequest {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john-snow@targeryan.com',
  })
    email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '10204060',
  })
    password: string;
}
