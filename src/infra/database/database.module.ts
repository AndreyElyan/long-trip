import { jwtConstants } from '@app/entities/authentication/constants';
import { AuthenticationRepository } from '@app/repositories/authentication-repository';
import { CarsRepository } from '@app/repositories/cars-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { TripsRepository } from '@app/repositories/trips-repository';

import { JwtStrategy } from '@infra/auth/jwt.strategy';
import { LocalStrategy } from '@infra/auth/local.strategy';

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthenticationRepository } from './prisma/repositories/authentication/prisma-authentication-repository';
import { PrismaCarsRepository } from './prisma/repositories/cars/prisma-cars-repository';
import { PrismaUsersRepository } from './prisma/repositories/users/prisma-users-repository';
import { PrismaTripsRepository } from './prisma/repositories/trips/prisma-trips.repository';
import { PrismaEvaluationRepository } from './prisma/repositories/evaluations/evaluations-repository';
import { PrismaPassengerTripsRepository } from './prisma/repositories/passenger-trips/prisma-passenger-trips-repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: jwtConstants().secret }),
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    LocalStrategy,
    PrismaAuthenticationRepository,
    JwtService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    {
      provide: AuthenticationRepository,
      useClass: PrismaAuthenticationRepository,
    },
    { provide: CarsRepository, useClass: PrismaCarsRepository },
    { provide: TripsRepository, useClass: PrismaTripsRepository },
    { provide: EvaluationsRepository, useClass: PrismaEvaluationRepository },
    { provide: PassengerTripsRepository, useClass: PrismaPassengerTripsRepository },
  ],
  exports: [
    UsersRepository,
    AuthenticationRepository,
    CarsRepository,
    TripsRepository,
    EvaluationsRepository,
    PassengerTripsRepository,
  ],
})
export class DatabaseModule {}
