import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { Trips } from '@prisma/client';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';

export interface GetTripsByPassengerIdRequest {
  passengerId: string;
}

export interface GetTripsByPassengerIdResponse {
  trip: Trips;
}

@Injectable()
export class GetTripsByPassengerId {
  constructor(
    private tripsRepository: TripsRepository,
    private passengerRepository: PassengerTripsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    request: GetTripsByPassengerIdRequest,
  ): Promise<GetTripsByPassengerIdResponse[]> {
    const passengerTrips = await this.passengerRepository.getTripByPassenger(
      request.passengerId,
    );
    let response;
    if (passengerTrips) {
      response = await Promise.all(
        passengerTrips.map(async (trip) => {
          const [trips, passengers] = await Promise.all([
            this.tripsRepository.getDetailsOfTrip(trip.tripsId),
            this.passengerRepository.getPassengersByTrip(trip.tripsId),
          ]);
          const statusCanceled = 'canceled';
          if (trips?.status === statusCanceled) return null;
          const mappedPassengers = await Promise?.all(
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
          );

          return { trips, passengers: mappedPassengers };
        }),
      );
    }

    return response.filter((trip) => trip !== null);
  }
}
