import { UserDataViewModel } from '@infra/http/view-models/users/user-data-view-model';
import { UserInformationViewModel } from '@infra/http/view-models/users/user-information-view-model';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';

import { CreateUser } from '@app/use-cases/users/create-user';
import { GetUserById } from '@app/use-cases/users/get-user-by-id';
import { Update } from '@app/use-cases/users/update-user';
import { CreateUserBody } from '@infra/http/dtos/users/create-user-body';

import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { ConflictSwagger } from '@helpers/swagger/conflict-swagger';

import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { GetUserByEmail } from '@app/use-cases/users/get-user-by-email';
import { EmailAlreadyExistsError } from '@app/errors/users/email-already-exists';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/users/prisma-users-repository';
import { ValidateEmailBody } from '@infra/http/dtos/users/validate-email-body.entity';
import { UpdateUserBody } from '@infra/http/dtos/users/update-user-body';
import { UsersPreferences } from '@app/use-cases/users/user-preferences';
import { UserPreferencesBody } from '@infra/http/dtos/users/user-preferences-body';
import { GetUserProfile } from '@app/use-cases/users/get-user-profile';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
    private updateUser: Update,
    private userProfile: GetUserProfile,
    private getUserByEmail: GetUserByEmail,
    private prismaRepository: PrismaUsersRepository,
    private usersPreferences: UsersPreferences,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserInformationViewModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    type: ConflictSwagger,
  })
  async create(@Body() body: CreateUserBody) {
    const {
      name,
      lastName,
      password,
      dateOfBirth,
      gender,
      cellPhone,
      email,
      imageUrl,
    } = body;

    const { user } = await this.createUser.execute({
      name,
      lastName,
      password,
      imageUrl,
      dateOfBirth,
      gender,
      cellPhone,
      email,
    });

    return { user: UserInformationViewModel.toResponse(user) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserDataViewModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserNotFoundError,
  })
  async get(@Param('id') id: string) {
    const user = await this.getUserById.execute(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return { user: UserDataViewModel.toResponse(user) };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User update by id',
    type: UserDataViewModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: UserNotFoundError,
  })
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    const user = await this.updateUser.execute(id, body);

    return { user: UserDataViewModel.toResponse(user) };
  }

  @Post('validate-email')
  @ApiOperation({ summary: 'Validate if email is already in use' })
  @ApiResponse({
    status: 200,
    description: 'Email is not in use',
  })
  @ApiBadRequestResponse({ description: 'Email is already in use' })
  async validateEmail(@Body() body: ValidateEmailBody) {
    const user = await this.prismaRepository.findByEmail(body.email);

    if (user) {
      throw new EmailAlreadyExistsError();
    }

    throw new HttpException(
      { message: 'Email is not in use', type: 'success' },
      HttpStatus.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-by-email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserDataViewModel,
  })
  async findByEmail(@Param('email') email: string) {
    const user = await this.getUserByEmail.execute(email);

    return { user: UserDataViewModel.toResponse(user) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences/:id')
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiResponse({
    status: 200,
    description: 'User preferences found',
  })
  async getPreferences(@Param('id') id: string) {
    const preferences = await this.usersPreferences.getPreferences(id);

    return { preferences };
  }

  @UseGuards(JwtAuthGuard)
  @Put('preferences/')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({
    status: 200,
    description: 'User preferences updated',
  })
  async updatePreferences(@Body() body: UserPreferencesBody) {
    await this.usersPreferences.setPreferences(body);

    const preferences = await this.usersPreferences.getPreferences(body.id);

    return preferences;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiResponse({
    status: 200,
    description: 'User preferences found',
  })
  async getUserProfile(@Param('id') id: string) {
    const profile = await this.userProfile.execute({ id });

    return profile;
  }
}
