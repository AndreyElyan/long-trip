import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';

import { VehiclesClient } from '@infra/http/clients/external-cars/vehicles.client';

import { CreateCarBody } from '@infra/http/dtos/cars/create-car-body.entity';
import { UpdateCarDto } from '@infra/http/dtos/cars/update-car.entity';

import { CreateCar } from '@app/use-cases/cars/create-car';
import { UpdateCar } from '@app/use-cases/cars/update-car';
import { GetCarById } from '@app/use-cases/cars/get-car-by-id';
import { GetUserCars } from '@app/use-cases/cars/get-user-cars';
import { DeleteCar } from '@app/use-cases/cars/delete-car';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { ConflictSwagger } from '@helpers/swagger/conflict-swagger';
import { CarResponse } from '@infra/http/dtos/cars/car-response.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private vehiclesClient: VehiclesClient,
    private createCarMethod: CreateCar,
    private updateCarMethod: UpdateCar,
    private getCarByIdMethod: GetCarById,
    private getUserCars: GetUserCars,
    private deleteCarMethod: DeleteCar,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('cars/available-makes')
  @ApiOperation({ summary: 'Get available makes' })
  async getAvailableMakes() {
    return this.vehiclesClient.getAvailableMakes();
  }

  @UseGuards(JwtAuthGuard)
  @Get('cars/models/:makeId')
  @ApiOperation({ summary: 'Get models by make' })
  async getModels(@Param('makeId') makeId: string) {
    return this.vehiclesClient.getModels(makeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cars/available-years/:makeId/:modelId')
  @ApiOperation({ summary: 'Get available years by make and model' })
  async getAvailableCars(
  @Param('makeId') makeId: string,
    @Param('modelId') modelId: string,
  ) {
    return this.vehiclesClient.getAvailableYears(makeId, modelId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cars/create')
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The car has been successfully created.',
    type: CarResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async createCar(@Body() body: CreateCarBody) {
    return this.createCarMethod.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cars/:id')
  @ApiOperation({ summary: 'Get a car by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The car has been successfully found.',
    type: UpdateCarDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Car not found',
    type: ConflictSwagger,
  })
  async getCarById(@Param('id') id: string) {
    return this.getCarByIdMethod.execute(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cars/user/:userId')
  @ApiOperation({ summary: 'Get all cars by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The cars have been successfully found.',
    type: CarResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cars not found',
    type: ConflictSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async getCarsByUserId(@Param('userId') userId: string) {
    return this.getUserCars.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('cars/update/:id')
  @ApiOperation({ summary: 'Update a car' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The car has been successfully updated.',
    type: UpdateCarDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async updateCar(@Param('id') id: string, @Body() body: UpdateCarDto) {
    return this.updateCarMethod.execute(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cars/delete/:id')
  @ApiOperation({ summary: 'Delete a registered car by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The car has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Car not found',
    type: ConflictSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCar(@Param('id') id: string) {
    return this.deleteCarMethod.execute(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The categories have been successfully found.',
  })
  async getCategories() {
    const categories = {
      categories: [
        {
          id: 1,
          label: 'Carro',
          name: 'car',
        },
        {
          id: 2,
          label: 'Ônibus',
          name: 'bus',
        },
        {
          id: 3,
          label: 'Van',
          name: 'van',
        },
      ],
    };

    return categories;
  }
}
