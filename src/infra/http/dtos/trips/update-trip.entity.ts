import { PartialType } from '@nestjs/mapped-types';
import { CreateTripBody } from './create-trip-body.entity';

export class UpdateCarDto extends PartialType(CreateTripBody) {}
