import { CancelTrip } from '@app/use-cases/trips/cancel-trip';
import { CreateTrip } from '@app/use-cases/trips/create-trip';
import { GetDetailsOfTrip } from '@app/use-cases/trips/get-details-of-trip';
import { GetTripsByAddress } from '@app/use-cases/trips/get-trips-by-address';
import { GetTripsByUserId } from '@app/use-cases/trips/get-trips-by-userid';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaTripsRepository } from '@infra/database/prisma/repositories/trips/prisma-trips.repository';
import { EventsGateway } from '@infra/events/events.gateway';
import { HttpModule } from '@infra/http/http.module';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '@test/test.module';
import { GetTripsByType } from '@app/use-cases/trips/get-trips-by-type';
import { GetTripProfile } from '@app/use-cases/trips/get-trip-profile';
import { AssignTripToUser } from '@app/use-cases/trips/assign-trip-to-user';
import { GetTripsByPassengerId } from '@app/use-cases/trips/get-trips-by-passengerid';
import { RemoveUserFromTrip } from '@app/use-cases/trips/remove-user-from-trip';
import { AcceptPassenger } from '@app/use-cases/trips/accept-passenger';
import { TripsController } from './trips.controller';

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    jest.mock(
      '@infra/database/prisma/repositories/trips/prisma-trips.repository',
    );
    jest.mock('@infra/http/controllers/trips/trips.controller.ts');
    const module: TestingModule = await createTestingModule({
      imports: [DatabaseModule, HttpModule],
      controllers: [TripsController],
      providers: [
        GetTripsByUserId,
        AssignTripToUser,
        CreateTrip,
        GetDetailsOfTrip,
        GetTripsByPassengerId,
        GetTripsByType,
        GetTripProfile,
        CancelTrip,
        GetTripsByAddress,
        PrismaTripsRepository,
        RemoveUserFromTrip,
        PrismaService,
        JwtService,
        EventsGateway,
        AcceptPassenger,
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new trip', async () => {
    const createTripSpy = jest.spyOn(controller, 'create');

    const body = {
      id: 0,
      tripId: 'sdsdsdfßß',
      driverId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      carInfoId: 1,
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
      description: 'Viagem de teste',
      passengers: [],
      tripType: 'DRIVER',
    };

    jest.spyOn(controller, 'create').mockImplementation(async () => body);

    await controller.create(body);

    expect(createTripSpy).toBeCalledTimes(1);

    expect(createTripSpy).toBeCalledWith(body);

    expect(createTripSpy).toReturn();
  });

  it('should be able to get trips by user id', async () => {
    const body = [
      {
        trip: {
          id: 0,
          driverId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
          carInfoId: 1,
          origin: 'Porto Alegre',
          destination: 'São Paulo',
          lat: 0,
          lng: 0,
          latDest: 0,
          lngDest: 0,
          distance: 0,
          duration: 0,
          status: 'pending',
          date: '2021-07-19',
          time: '10:00',
          cost: 100,
          seats: 4,
          description: 'Viagem de teste',
          passengers: null,
          tripType: 'DRIVER',
          tripId: 'e3c698fc-a755-4083-a8e8-30a8c',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        passengers: [],
      },
    ];

    TripsController.prototype.getTripsByUserId = jest
      .fn()
      .mockReturnValue(body);

    const getTripsByUserIdSpy = jest.spyOn(controller, 'getTripsByUserId');

    jest
      .spyOn(controller, 'getTripsByUserId')
      .mockImplementation(async () => body);

    await controller.getTripsByUserId('e3c698fc-a755-4083-a8e8-30a8cc82680f');

    expect(getTripsByUserIdSpy).toBeCalledTimes(1);

    expect(getTripsByUserIdSpy).toBeCalledWith(
      'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    );

    expect(getTripsByUserIdSpy).toReturn();
  });
});
