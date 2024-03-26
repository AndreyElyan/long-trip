import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Rua dos Bobos',
  })
    address: string;
}
