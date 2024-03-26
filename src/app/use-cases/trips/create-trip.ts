import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { CarsRepository } from '@app/repositories/cars-repository';

import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { Trips } from '@app/entities/trips/trips';
import { TypeNotFound } from '@app/errors/trips/type-not-found';
import { UserCarsNotFoundError } from '../../errors/users/user-cars-not-found';
import { TripTypes } from './trip-types';

export interface CreateTripRequest {
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  latDest: number;
  lngDest: number;
  date: string;
  time: string;
  cost: number;
  seats: number;
  carInfoId: number;
  driverId: string;
  description: string;
  tripType: string;
}

export interface CreateTripResponse {
  id: number;
  tripId: string;
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  latDest: number;
  lngDest: number;
  date: string;
  time: string;
  cost: number;
  seats: number;
  carInfoId: number;
  driverId: string;
  description: string;
  passengers?: string[];
  tripType: string;
}

@Injectable()
export class CreateTrip {
  constructor(
    private tripsRepository: TripsRepository,
    private usersRepository: UsersRepository,
    private carsRepository: CarsRepository,
  ) {}

  async execute(request: CreateTripRequest): Promise<CreateTripResponse> {
    if (!TripTypes[request.tripType]) throw new TypeNotFound();

    const driverCars = await this.carsRepository.getUserCars(request.driverId);
    const driver = await this.usersRepository.getUserById(request.driverId);

    if (!driver) throw new UserNotFoundError();

    if (!driverCars) throw new UserCarsNotFoundError();

    const trip = new Trips({ ...request });

    const createdTrip = await this.tripsRepository.create(trip);

    const tripResponse: CreateTripResponse = {
      id: createdTrip.id,
      tripId: createdTrip.tripId,
      origin: trip.origin,
      destination: trip.destination,
      lat: trip.lat,
      lng: trip.lng,
      latDest: trip.latDest,
      lngDest: trip.lngDest,
      date: trip.date,
      time: trip.time,
      cost: trip.cost,
      seats: trip.seats,
      carInfoId: trip.carInfoId,
      driverId: trip.driverId,
      description: trip.description,
      passengers: trip.passengers,
      tripType: trip.tripType.toLocaleUpperCase(),
    };

    return tripResponse;
  }
}
