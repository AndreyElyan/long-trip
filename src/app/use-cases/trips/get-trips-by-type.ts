import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';

import { TripsByTypeNotFound } from '@app/errors/trips/trips-by-type-not-found';
import { TypeNotFound } from '@app/errors/trips/type-not-found';
import { TripTypes } from './trip-types';

export interface GetTripsByTypeRequest {
  tripType: string;
}

export interface GetTripsByTypeResponse {
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
  tripType: string;
}

@Injectable()
export class GetTripsByType {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(
    request: GetTripsByTypeRequest,
  ): Promise<GetTripsByTypeResponse[]> {
    const tripType = request.tripType.toUpperCase();
    if (!TripTypes[tripType]) throw new TypeNotFound();
    const trips = await this.tripsRepository.getTripsByType(tripType);

    if (!trips) throw new TripsByTypeNotFound();

    return trips;
  }
}
