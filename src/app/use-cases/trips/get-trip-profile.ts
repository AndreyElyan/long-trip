import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { CarsRepository } from '@app/repositories/cars-repository';

import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { TripsByUserNotFound } from '@app/errors/trips/trips-by-user-not-found';
import { UserDataViewModel } from '@infra/http/view-models/users/user-data-view-model';
import { TripCreateDataViewModel } from '@infra/http/view-models/trips/trip-create-data-view.model';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { CarResponse } from '../cars/get-car-by-id';

export interface GetTripProfileRequest {
  tripId: string;
}

export interface GetTripProfileResponse {
  trip: TripCreateDataViewModel;
  user: UserDataViewModel;
  car: CarResponse;
}

@Injectable()
export class GetTripProfile {
  constructor(
    private tripsRepository: TripsRepository,
    private usersRepository: UsersRepository,
    private carsRepository: CarsRepository,
    private passengerRepository: PassengerTripsRepository,
    private evaluationsRepository: EvaluationsRepository,
  ) {}

  async execute(
    request: GetTripProfileRequest,
  ): Promise<GetTripProfileResponse> {
    const trip = await this.tripsRepository.getDetailsOfTrip(request.tripId);
    if (!trip) throw new TripsByUserNotFound();

    const user = await this.usersRepository.getUserById(trip.driverId);
    if (!user) throw new UserNotFoundError();

    const passengerTrips = await this.passengerRepository.getPassengersByTrip(
      request.tripId,
    );
    const passengers = await Promise?.all(
      passengerTrips?.map(async (tripRes) => {
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

    const car = await this.carsRepository.getCarById(trip.carInfoId);

    const evaluations
      = await this.evaluationsRepository.getEvaluationByDriverId(trip.driverId);

    const response = {
      trip,
      user: UserDataViewModel.toProfile(user),
      car,
      passengers,
      evaluations,
    };

    return response;
  }
}
