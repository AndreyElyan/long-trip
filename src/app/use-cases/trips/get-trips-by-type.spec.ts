import { InMemoryTripsRepository } from '@test/repositories/in-memory-trips-repository';

import { CreateTripRequest } from './create-trip';
import { GetTripsByType } from './get-trips-by-type';

describe('GetTripsByUserId', () => {
  const tripsRepository = new InMemoryTripsRepository();

  const getTrips = new GetTripsByType(tripsRepository);

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

    const trips = await getTrips.execute({ tripType: 'DRIVER' });

    expect(trips).toEqual(tripsRepository.trips);
  });
});
