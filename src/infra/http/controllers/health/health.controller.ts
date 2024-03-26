/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller, Get, HttpStatus, HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async health() {
    return 'Success!';
  }
}
