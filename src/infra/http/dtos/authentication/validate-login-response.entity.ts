import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateLoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '12121-121212-121212-121212',
  })
    id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '30d',
  })
    expiresIn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'eybaiuguaysg123mnjabsjas,oiababahsbayvqwspikqe',
  })
    access_token: string;
}
