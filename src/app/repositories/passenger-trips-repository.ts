import { CreateTripUserDto } from '@infra/http/dtos/trips/create-trip-to-user-dto';

export abstract class PassengerTripsRepository {
  abstract getTripByPassenger(id: string);

  abstract getPassengersByTrip(id: string);

  abstract removePassengerFromTrip(usersId: string, tripsId: string);

  abstract create(passenger: CreateTripUserDto);

  abstract acceptPassenger(tripsId: string, usersId: string);
}
