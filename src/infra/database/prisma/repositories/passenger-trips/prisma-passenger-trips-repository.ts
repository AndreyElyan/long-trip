/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { TripPassenger } from '@prisma/client';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { CreateTripUserDto } from '@infra/http/dtos/trips/create-trip-to-user-dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaPassengerTripsRepository
implements PassengerTripsRepository {
  constructor(private prismaService: PrismaService) {}

  async getTripByPassenger(id: string) {
    const passengers = await this.prismaService.tripPassenger.findMany({
      where: {
        usersId: id,
      },
    });

    return passengers;
  }

  async getPassengersByTrip(id: string) {
    const passengers = await this.prismaService.tripPassenger.findMany({
      where: {
        tripsId: id,
      },
    });

    return passengers;
  }

  async removePassengerFromTrip(usersId: string, tripsId: string) {
    return this.prismaService.tripPassenger.deleteMany({
      where: {
        usersId,
        tripsId,
      },
    });
  }

  async create(passenger: CreateTripUserDto): Promise<TripPassenger> {
    const tripResponse = await this.prismaService.tripPassenger.create({
      data: {
        tripsId: passenger.tripId,
        usersId: passenger.passengerId,
      },
    });

    return tripResponse;
  }

  async acceptPassenger(tripsId: string, usersId: string) {
    return this.prismaService.tripPassenger.updateMany({
      where: {
        tripsId,
        usersId,
      },
      data: {
        status: 'accepted',
      },
    });
  }
}
