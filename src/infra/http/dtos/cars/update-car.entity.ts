import { PartialType } from '@nestjs/mapped-types';
import { CreateCarBody } from './create-car-body.entity';

export class UpdateCarDto extends PartialType(CreateCarBody) {}
