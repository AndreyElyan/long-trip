import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBody } from './create-user-body';

export class UpdateUserBody extends PartialType(CreateUserBody) {}
