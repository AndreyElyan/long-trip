import { InMemoryTripsRepository } from '@test/repositories/in-memory-trips-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

import { InMemoryPassengerTripsRepository } from '@test/repositories/in-memory-passengers-repository';
import { CreateTripRequest } from './create-trip';
import { GetDetailsOfTrip } from './get-details-of-trip';

describe('GetDetailsOfTrip', () => {
  const tripsRepository = new InMemoryTripsRepository();
  const usersRepository = new InMemoryUsersRepository();
  const tripPassengerRepository = new InMemoryPassengerTripsRepository();

  const getTrips = new GetDetailsOfTrip(
    tripsRepository,
    usersRepository,
    tripPassengerRepository,
  );

  it('should be able to get trip by trip id', async () => {
    const request: CreateTripRequest = {
      origin: 'Porto Alegre',
      destination: 'São Paulo',
      lat: 0,
      lng: 0,
      latDest: 0,
      lngDest: 0,
      date: '2021-07-19',
      time: '10:00',
      cost: 100,
      seats: 4,
      carInfoId: tripsRepository.user_response.vehicles[0].id,
      driverId: tripsRepository.user_response.id,
      description: 'Viagem de teste',
      tripType: 'DRIVER',
    };

    await tripsRepository.create(request);

    const tripId = tripsRepository.trips[0]._id;

    const trips = await getTrips.execute({ tripId });

    expect(trips.trip).toEqual(tripsRepository.trips[0]);
  });
});
