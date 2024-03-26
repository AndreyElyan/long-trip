import { Trips } from '@prisma/client';

export abstract class TripsRepository {
  abstract getTripsByType(tripType: string): Promise<Trips[]>;

  abstract create(trip: Trips): Promise<Trips>;

  abstract getTripsByUserId(userId: string): Promise<Trips[]>;

  abstract getTripsByAddress(
    originAddress: string,
    destinationAddress: string,
    seats: number,
    filters?: string[],
  ): Promise<Trips[]>;

  abstract getDetailsOfTrip(tripId: string): Promise<Trips>;

  abstract cancelTrip(tripId: string): Promise<void>;
}
