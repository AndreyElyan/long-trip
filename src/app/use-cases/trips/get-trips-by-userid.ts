import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';

import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';
import { Trips } from '@prisma/client';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';

export interface GetTripsByUserIdRequest {
  userId: string;
}

export interface GetTripsByUserIdResponse {
  trip: Trips;
  passengers: any;
}

@Injectable()
export class GetTripsByUserId {
  constructor(
    private tripsRepository: TripsRepository,
    private usersRepository: UsersRepository,
    private passengerRepository: PassengerTripsRepository,
  ) {}

  async execute(
    request: GetTripsByUserIdRequest,
  ): Promise<GetTripsByUserIdResponse[]> {
    const user = await this.usersRepository.getUserById(request.userId);

    if (!user) throw new UserNotFoundError();

    const userTrips = await this.tripsRepository.getTripsByUserId(
      request.userId,
    );
    if (!userTrips) throw new TripsByUserNotFound();

    const response = await Promise.all(
      userTrips.map(async (trip) => {
        const passengers = await this.passengerRepository.getPassengersByTrip(
          trip.tripId,
        );
        const mappedPassengers = passengers ?
          await Promise?.all(
            passengers?.map(async (tripRes) => {
              const passenger = await this.usersRepository.getUserById(
                tripRes.usersId,
              );
              return {
                id: passenger.id,
                name: passenger.name,
                img: passenger.imageUrl,
                gender: passenger.gender,
                celphone: passenger.cellPhone,
                status: tripRes.status,
              };
            }),
          )
          : [];

        return {
          trip,
          passengers: mappedPassengers,
        };
      }),
    );

    return response;
  }
}
