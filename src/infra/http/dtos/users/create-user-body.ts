import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
  })
    name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
  })
    lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '10204060',
  })
    password: string;

  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
    imageUrl: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '19/07/1930',
  })
    dateOfBirth: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Masculino',
  })
    gender: string;

  @ApiProperty({
    example: '51985809513',
  })
    cellPhone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john-snow@targeryan.com',
  })
    email: string;
}
