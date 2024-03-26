import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';

import { TripsByAddressNotFound } from '@app/errors/trips/trips-by-address-not-found';
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { CarsRepository } from '@app/repositories/cars-repository';
import { TripsByCategoryNotFound } from '@app/errors/trips/trips-by-category-not-found';
import { UsersRepository } from '@app/repositories/users-repository';

export interface GetTripsByAddressRequest {
  filters?: string[];
  originAddress: string;
  destinationAddress: string;
  seats: number;
}

export interface GetTripsByAdressResponse {
  id: number;
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

@Injectable()
export class GetTripsByAddress {
  constructor(
    private tripsRepository: TripsRepository,
    private userRepository: UsersRepository,
    private evaluationsRepository: EvaluationsRepository,
    private passengerRepository: PassengerTripsRepository,
    private carsRepository: CarsRepository,
  ) {}

  async execute(request: GetTripsByAddressRequest) {
    let categoryValue;
    request?.filters?.forEach((filter) => {
      const paramPair = filter.split('=');
      if (paramPair[0] === 'category') {
        categoryValue = paramPair[1].toLocaleLowerCase();
      }
    });

    const trips = await this.tripsRepository.getTripsByAddress(
      request.originAddress,
      request.destinationAddress,
      request.seats,
      request?.filters,
    );

    if (!trips) throw new TripsByAddressNotFound();

    const response = trips.map(async (trip) => {
      const carResponse = await this.carsRepository.getCarById(trip.carInfoId);
      const { category } = carResponse;
      if (
        categoryValue
        && category
        && category.toLocaleLowerCase() !== categoryValue
      ) {
        throw new TripsByCategoryNotFound();
      }
      const car = carResponse.props;
      const evaluations
        = await this.evaluationsRepository.getEvaluationByDriverId(trip.driverId);

      const passengers = await this.passengerRepository.getPassengersByTrip(
        trip.tripId,
      );


      const driver = await this.userRepository.getUserById(trip.driverId)

      const confirmedPassengers = passengers.filter(
        (passenger) => passenger.status === 'accepted',
      );

      const tripResponse = {
        tripId: trip.tripId,
        origin: trip.origin,
        driverImg: driver.imageUrl,
        driverName: driver.name,
        destination: trip.destination,
        lat: trip.lat,
        lng: trip.lng,
        latDest: trip.latDest,
        lngDest: trip.lngDest,
        date: trip.date,
        time: trip.time,
        cost: trip.cost,
        seats: trip.seats,
        driverId: trip.driverId,
        description: trip.description,
        tripType: trip.tripType,
        evaluations,
        confirmedPassengers: confirmedPassengers.length,
        car,
      };

      return tripResponse;
    });

    return Promise.all(response);
  }
}
