import { InMemoryTripsRepository } from '@test/repositories/in-memory-trips-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import {
  CreateTrip,
  CreateTripRequest,
  CreateTripResponse,
} from './create-trip';

describe('CreateTrip', () => {
  const tripsRepository = new InMemoryTripsRepository();
  const usersRepository = new InMemoryUsersRepository();
  const carsRepository = new InMemoryCarsRepository();
  const createTrip = new CreateTrip(
    tripsRepository,
    usersRepository,
    carsRepository,
  );

  it('should create a new trip', async () => {
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

    const response: CreateTripResponse = await createTrip.execute(request);

    expect(response).toEqual(tripsRepository.trip_response);
  });
});
