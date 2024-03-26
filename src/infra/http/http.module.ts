import { Module } from '@nestjs/common';

import { PrismaService } from '@infra/database/prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';

import { PrismaAuthenticationRepository } from '@infra/database/prisma/repositories/authentication/prisma-authentication-repository';

import { ValidateLogin } from '@app/use-cases/authentication/validate-login';

import { ForgotPassword } from '@app/use-cases/users/password/forgot-password';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/users/prisma-users-repository';
import { CreateCar } from '@app/use-cases/cars/create-car';
import { GetCarById } from '@app/use-cases/cars/get-car-by-id';
import { GetUserCars } from '@app/use-cases/cars/get-user-cars';
import { UpdateCar } from '@app/use-cases/cars/update-car';
import { DeleteCar } from '@app/use-cases/cars/delete-car';

import { PrismaTripsRepository } from '@infra/database/prisma/repositories/trips/prisma-trips.repository';
import { CreateTrip } from '@app/use-cases/trips/create-trip';

import { CreateUser } from '@app/use-cases/users/create-user';
import { GetUserById } from '@app/use-cases/users/get-user-by-id';
import { GetUserByEmail } from '@app/use-cases/users/get-user-by-email';
import { Update } from '@app/use-cases/users/update-user';
import { ValidFormats } from '@helpers/imageValidFormats';
import { GetTripsByUserId } from '@app/use-cases/trips/get-trips-by-userid';
import { GetTripsByAddress } from '@app/use-cases/trips/get-trips-by-address';
import { GetTripsByType } from '@app/use-cases/trips/get-trips-by-type';

import { GetDetailsOfTrip } from '@app/use-cases/trips/get-details-of-trip';
import { CancelTrip } from '@app/use-cases/trips/cancel-trip';
import { EventsGateway } from '@infra/events/events.gateway';
import { CreateEvaluation } from '@app/use-cases/evaluations/create-evaluation';
import { PrismaEvaluationRepository } from '@infra/database/prisma/repositories/evaluations/evaluations-repository';
import { UsersPreferences } from '@app/use-cases/users/user-preferences';
import { GetEvaluationsByDriverId } from '@app/use-cases/evaluations/get-evaluations-by-driver-id';
import { GetTripProfile } from '@app/use-cases/trips/get-trip-profile';
import { AssignTripToUser } from '@app/use-cases/trips/assign-trip-to-user';
import { PrismaPassengerTripsRepository } from '@infra/database/prisma/repositories/passenger-trips/prisma-passenger-trips-repository';
import { RemoveUserFromTrip } from '@app/use-cases/trips/remove-user-from-trip';
import { GetTripsByPassengerId } from '@app/use-cases/trips/get-trips-by-passengerid';
import { AcceptPassenger } from '@app/use-cases/trips/accept-passenger';
import { GetUserProfile } from '@app/use-cases/users/get-user-profile';
import { PasswordController } from './controllers/password/password.controller';

import { VehiclesClient } from './clients/external-cars/vehicles.client';
import { VehiclesController } from './controllers/vehicles/vehicles.controller';
import { VehiclesModule } from './clients/external-cars/vehicles.module';
import { UsersController } from './controllers/users/users.controller';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { HealthModule } from './controllers/health/health.module';
import { DatabaseModule } from '../database/database.module';
import { TripsController } from './controllers/trips/trips.controller';
import { AddressModule } from './clients/external-address/address.module';
import { AddressController } from './controllers/address/address.controller';
import { AddressClient } from './clients/external-address/address.client';
import { EvaluationController } from './controllers/evaluation/evaluation.controller';

@Module({
  imports: [DatabaseModule, VehiclesModule, AddressModule, HealthModule],
  controllers: [
    UsersController,
    AuthenticationController,
    VehiclesController,
    AddressController,
    PasswordController,
    TripsController,
    EvaluationController,
  ],
  providers: [
    ValidateLogin,
    PrismaAuthenticationRepository,
    PrismaService,
    JwtService,
    VehiclesClient,
    AddressClient,
    CreateCar,
    GetCarById,
    GetUserCars,
    UpdateCar,
    DeleteCar,
    ForgotPassword,
    PrismaUsersRepository,
    PrismaPassengerTripsRepository,
    GetTripsByPassengerId,
    CreateUser,
    GetUserById,
    Update,
    ValidFormats,
    GetUserByEmail,
    CreateTrip,
    GetTripsByUserId,
    AssignTripToUser,
    GetTripsByAddress,
    GetTripsByType,
    AssignTripToUser,
    RemoveUserFromTrip,
    GetTripProfile,
    GetDetailsOfTrip,
    PrismaTripsRepository,
    CancelTrip,
    EventsGateway,
    CreateEvaluation,
    PrismaEvaluationRepository,
    UsersPreferences,
    GetEvaluationsByDriverId,
    AcceptPassenger,
    GetUserProfile,
  ],
})
export class HttpModule {}
