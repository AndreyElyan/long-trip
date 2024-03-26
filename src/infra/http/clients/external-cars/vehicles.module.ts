import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@infra/database/prisma/prisma.service';

import { UsersRepository } from '@app/repositories/users-repository';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/users/prisma-users-repository';

import { VehiclesController } from '@infra/http/controllers/vehicles/vehicles.controller';
import { CarsRepository } from '@app/repositories/cars-repository';
import { PrismaCarsRepository } from '@infra/database/prisma/repositories/cars/prisma-cars-repository';
import { CreateCar } from '@app/use-cases/cars/create-car';
import { GetCarById } from '@app/use-cases/cars/get-car-by-id';
import { GetUserCars } from '@app/use-cases/cars/get-user-cars';
import { UpdateCar } from '@app/use-cases/cars/update-car';
import { DeleteCar } from '@app/use-cases/cars/delete-car';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { PrismaPassengerTripsRepository } from '@infra/database/prisma/repositories/passenger-trips/prisma-passenger-trips-repository';
import { VehiclesClient } from './vehicles.client';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [VehiclesController],
  providers: [
    PrismaService,
    { provide: CarsRepository, useClass: PrismaCarsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    VehiclesClient,
    CreateCar,
    GetCarById,
    GetUserCars,
    UpdateCar,
    DeleteCar,
    PrismaService,
    JwtService,
    { provide: CarsRepository, useClass: PrismaCarsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: PassengerTripsRepository, useClass: PrismaPassengerTripsRepository },
  ],

  exports: [HttpModule],
})
export class VehiclesModule {}
