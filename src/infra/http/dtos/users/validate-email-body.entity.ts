import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserBody } from './create-user-body';

export class ValidateEmailBody extends PartialType(CreateUserBody) {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john-snow@targeryan.com.br',
  })
    email: string;
}
