import { ValidateLogin } from '@app/use-cases/authentication/validate-login';
import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { ValidateLoginBodyRequest } from '@infra/http/dtos/authentication/validate-login-body.entity';
import { ValidateLoginResponseDto } from '@infra/http/dtos/authentication/validate-login-response.entity';

import {
  Body, Controller, HttpStatus, Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private validateLogin: ValidateLogin) {}

  @Post('login')
  @ApiOperation({ summary: 'Make login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully',
    type: ValidateLoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async login(@Body() body: ValidateLoginBodyRequest) {
    const { email, password } = body;

    const user = await this.validateLogin.execute({ email, password });

    return user;
  }
}
