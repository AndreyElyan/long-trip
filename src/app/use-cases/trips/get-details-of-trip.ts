import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';

import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';

export interface GetDetailsOfTripRequest {
  tripId: string;
}

export interface GetDetailsOfTripResponse {
  trip: {
    id: number;
    origin: string;
    destination: string;
    lat: number;
    lng: number;
    date: string;
    time: string;
    cost: number;
    seats: number;
    carInfoId: number;
    driverId: string;
    description: string;
  };
  passengers: {
    id: string;
    name: string;
    img: string;
  }[];
}

@Injectable()
export class GetDetailsOfTrip {
  constructor(
    private tripsRepository: TripsRepository,
    private userRepository: UsersRepository,
    private passengerTripsRepository: PassengerTripsRepository,
  ) {}

  async execute(
    request: GetDetailsOfTripRequest,
  ): Promise<GetDetailsOfTripResponse> {
    const [userTrips, passengerTrips] = await Promise.all([
      this.tripsRepository.getDetailsOfTrip(request.tripId),
      this.passengerTripsRepository.getPassengersByTrip(request.tripId),
    ]);
    let passengers = [];
    if (passengerTrips) {
      passengers = await Promise.all(
        passengerTrips.map(async (trip) => {
          const passenger = await this.userRepository.getUserById(trip.usersId);
          return {
            name: passenger.name,
            img: passenger.imageUrl,
            id: passenger.id,
          };
        }),
      );
    }

    if (!userTrips) throw new TripsByUserNotFound();

    return { trip: userTrips, passengers };
  }
}
