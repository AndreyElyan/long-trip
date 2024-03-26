import { InMemoryTripsRepository } from '@test/repositories/in-memory-trips-repository';

import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import { CreateTripRequest } from './create-trip';

describe('GetTripsWithAddress', () => {
  const tripsRepository = new InMemoryTripsRepository();
  // const evaluationsRepository = new InMemoryEvaluationRepository();
  // const passengerRepository = new InMemoryPassengerTripsRepository();
  const carsRepository = new InMemoryCarsRepository();

  // const getTrips = new GetTripsByAddress(
  //   tripsRepository,
  //   evaluationsRepository,
  //   passengerRepository,
  //   carsRepository,
  // );

  it('should be able to get trip by address', async () => {
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

    await carsRepository.create({
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1236',
      imageUrl: '',
      userId: tripsRepository.user_response.id,
      category: 'car',
    });

    await tripsRepository.create(request);

    expect(request.origin).toEqual(tripsRepository.trip_response.origin);
  });
});
