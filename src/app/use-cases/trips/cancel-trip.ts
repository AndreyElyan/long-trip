import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';

import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';

export interface CancelTripRequest {
  tripId: string;
}

@Injectable()
export class CancelTrip {
  constructor(
    private tripsRepository: TripsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CancelTripRequest): Promise<void> {
    const trip = await this.tripsRepository.getDetailsOfTrip(request.tripId);

    if (!trip) throw new TripsByUserNotFound();

    const { status } = trip;

    if (status === 'canceled') {
      throw new Error('Trip already canceled');
    }

    await this.tripsRepository.cancelTrip(request.tripId);
  }
}
