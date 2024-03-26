import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';
import { UsersRepository } from '@app/repositories/users-repository';

import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { TripPassenger } from '@prisma/client';
import { DriverCannotBePassenger } from '@app/errors/assignTrip/driver-conflict';
import { TripsByAddressNotFound } from '@app/errors/trips/trips-by-address-not-found';
import { DriverNotFoundError } from '@app/errors/users/driver-not-found';
import { UserAlreadyOnTrip } from '@app/errors/assignTrip/passenger-alredy-on-trip';
import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';
import { SeatsFull } from '@app/errors/assignTrip/seats-full';

export interface AssignTripRequest {
  driverId: string;
  passengerId: string;
  tripsId: string;
}

@Injectable()
export class AssignTripToUser {
  constructor(
    private tripsRepository: TripsRepository,
    private usersRepository: UsersRepository,
    private usersTripsRepository: PassengerTripsRepository,
  ) {}

  async execute(request: AssignTripRequest): Promise<TripPassenger> {
    const { tripsId, passengerId, driverId } = request;
    const user = await this.usersRepository.getUserById(passengerId);
    if (!user) throw new UserNotFoundError();

    const trip = await this.tripsRepository.getDetailsOfTrip(tripsId);

    if (driverId === passengerId) throw new DriverCannotBePassenger();
    if (!trip) throw new TripsByAddressNotFound();
    if (trip.driverId !== driverId) throw new DriverNotFoundError();

    const totalPassengers = await this.usersTripsRepository.getPassengersByTrip(
      tripsId,
    );

    if (totalPassengers.length >= trip.seats) throw new SeatsFull();

    const passengersOnTrip
      = await this.usersTripsRepository.getPassengersByTrip(tripsId);
    const isPassengerOnTrip = passengersOnTrip.some(
      (p) => p.usersId === passengerId,
    );

    if (isPassengerOnTrip) throw new UserAlreadyOnTrip();

    return this.usersTripsRepository.create({ tripId: tripsId, passengerId });
  }
}
