import { InMemoryTripsRepository } from '@test/repositories/in-memory-trips-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

import { InMemoryPassengerTripsRepository } from '@test/repositories/in-memory-passengers-repository';
import { CreateTripRequest } from './create-trip';
import { GetTripsByUserId } from './get-trips-by-userid';

describe('GetTripsByUserId', () => {
  const tripsRepository = new InMemoryTripsRepository();
  const usersRepository = new InMemoryUsersRepository();
  const passengerRepository = new InMemoryPassengerTripsRepository();

  const getTrips = new GetTripsByUserId(
    tripsRepository,
    usersRepository,
    passengerRepository,
  );

  it('should be able to get trips by user id', async () => {
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

    const userId = tripsRepository.user_response.id;

    const trips = await getTrips.execute({ userId });

    expect(trips).toHaveLength(1);
  });
});
