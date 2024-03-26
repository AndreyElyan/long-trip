import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { Injectable } from '@nestjs/common';
import { TripPassenger } from '@prisma/client';

interface AcceptPassengerRequest {
  tripId: string;
  passengerId: string;
}

@Injectable()
export class AcceptPassenger {
  constructor(private passengerTripsRepository: PassengerTripsRepository) {}

  async execute(request: AcceptPassengerRequest): Promise<TripPassenger> {
    const { tripId, passengerId } = request;

    const trip = await this.passengerTripsRepository.getTripByPassenger(
      passengerId,
    );

    if (trip.length <= 0) throw new TripsByUserNotFound();

    const passenger = await this.passengerTripsRepository.getTripByPassenger(
      passengerId,
    );
    if (passenger.length <= 0) throw new UserNotFoundError();

    return this.passengerTripsRepository.acceptPassenger(tripId, passengerId);
  }
}
