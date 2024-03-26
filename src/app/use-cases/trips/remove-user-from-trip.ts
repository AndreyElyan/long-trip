import { Injectable } from '@nestjs/common';

import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';

export interface RemoveUserFromTripRequest {
  passengerId: string;
  tripId: string;
}

@Injectable()
export class RemoveUserFromTrip {
  constructor(private usersTripsRepository: PassengerTripsRepository) {}

  async execute(request: RemoveUserFromTripRequest): Promise<void> {
    const trip = await this.usersTripsRepository.getTripByPassenger(
      request.passengerId,
    );

    if (trip.length <= 0) throw new TripsByUserNotFound();

    const user = await this.usersTripsRepository.getPassengersByTrip(
      request.tripId,
    );

    if (user.length <= 0) throw new TripsByUserNotFound();

    await this.usersTripsRepository.removePassengerFromTrip(
      request.passengerId,
      request.tripId,
    );
  }
}
