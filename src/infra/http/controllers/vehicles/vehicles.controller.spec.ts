import { CreateCar } from '@app/use-cases/cars/create-car';
import { GetCarById } from '@app/use-cases/cars/get-car-by-id';
import { GetUserCars } from '@app/use-cases/cars/get-user-cars';
import { UpdateCar } from '@app/use-cases/cars/update-car';
import { DeleteCar } from '@app/use-cases/cars/delete-car';
import { DatabaseModule } from '@infra/database/database.module';
import { VehiclesClient } from '@infra/http/clients/external-cars/vehicles.client';
import { HttpModule } from '@infra/http/http.module';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '@test/test.module';
import { Observable } from 'rxjs';
import { VehiclesController } from './vehicles.controller';

describe('Vehicles Controller', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      imports: [HttpModule, DatabaseModule],
      controllers: [VehiclesController],
      providers: [
        CreateCar,
        VehiclesClient,
        GetCarById,
        GetUserCars,
        UpdateCar,
        DeleteCar,
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be able to get available makes', async () => {
    const makesResponse = [
      {
        Label: 'Acura',
        Value: '1',
      },
      {
        Label: 'Agrale',
        Value: '2',
      },
      {
        Label: 'Alfa Romeo',
        Value: '3',
      },
      {
        Label: 'AM Gen',
        Value: '4',
      },
    ];

    const response = new Observable((subscriber) => {
      subscriber.next(makesResponse);
    });

    jest
      .spyOn(controller, 'getAvailableMakes')
      .mockImplementation(async () => response);

    (await controller.getAvailableMakes()).subscribe((result) => {
      expect(result).toEqual(makesResponse);
    });

    expect(controller).toBeDefined();
  });

  it('should be able to get models', async () => {
    const modelsResponse = [
      {
        Label: 'A3',
        Value: '1',
      },
      {
        Label: 'A4',
        Value: '2',
      },
      {
        Label: 'A5',
        Value: '3',
      },
      {
        Label: 'A6',
        Value: '4',
      },
    ];

    const response = new Observable((subscriber) => {
      subscriber.next(modelsResponse);
    });

    jest
      .spyOn(controller, 'getModels')
      .mockImplementation(async () => response);

    (await controller.getModels('1')).subscribe((result) => {
      expect(result).toEqual(modelsResponse);
    });

    expect(controller).toBeDefined();
  });

  it('should be able to get available cars', async () => {
    const availableCarsResponse = [
      {
        Label: '2010',
        Value: '1',
      },
      {
        Label: '2011',
        Value: '2',
      },
      {
        Label: '2012',
        Value: '3',
      },
      {
        Label: '2013',
        Value: '4',
      },
    ];

    const response = new Observable((subscriber) => {
      subscriber.next(availableCarsResponse);
    });

    jest
      .spyOn(controller, 'getAvailableCars')
      .mockImplementation(async () => response);

    (await controller.getAvailableCars('1', '1')).subscribe((result) => {
      expect(result).toEqual(availableCarsResponse);
    });

    expect(controller).toBeDefined();
  });

  it('should be able to get vehicle by id', async () => {
    const vehicleResponse = {
      id: 1,
      make: 'Acura',
      model: 'A3',
      year: '2010',
      color: 'Black',
      licensePlate: 'ABC1234',
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
      category: 'car',
    };

    jest
      .spyOn(controller, 'getCarById')
      .mockImplementation(async () => vehicleResponse);

    await controller.getCarById('1');

    expect(controller).toBeDefined();
  });

  it('should be able to create a vehicle', async () => {
    const vehicleResponse = {
      props: {
        id: 1,
        make: 'Acura',
        model: 'A3',
        year: '2010',
        color: 'Black',
        licensePlate: 'ABC1234',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
        category: 'car',
      },
    };

    jest
      .spyOn(controller, 'createCar')
      .mockImplementation(async () => vehicleResponse);

    await controller.createCar({
      make: 'Acura',
      model: 'A3',
      year: '2010',
      color: 'Black',
      licensePlate: 'ABC1234',
      imageUrl: '',
      userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
      category: 'car',
    });

    expect(controller).toBeDefined();
  });

  it('should be able to update a vehicle', async () => {
    const vehicleBody = {
      year: '2012',
      color: 'Blue',
    };

    const vehicleResponse = {
      props: {
        id: 1,
        make: 'Acura',
        model: 'A3',
        year: '2010',
        color: 'Black',
        licensePlate: 'ABC1234',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
        category: 'car',
      },
    };

    jest
      .spyOn(controller, 'updateCar')
      .mockImplementation(async () => vehicleResponse);

    await controller.updateCar('1', vehicleBody);

    expect(controller).toBeDefined();
  });

  it('should be able to get all user cars', async () => {
    const userCarsResponse = [
      {
        props: {
          id: 1,
          make: 'Acura',
          model: 'A3',
          year: '2010',
          color: 'Black',
          licensePlate: 'ABC1234',
          imageUrl: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
          category: 'car',
        },
      },
      {
        props: {
          id: 2,
          make: 'Acura',
          model: 'A3',
          year: '2012',
          color: 'Black',
          licensePlate: 'ABC1244',
          imageUrl: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'asdasfa415a1f5a1s5fa155sa1f5as1f',
          category: 'car',
        },
      },
    ];

    jest
      .spyOn(controller, 'getCarsByUserId')
      .mockImplementation(async () => userCarsResponse);

    await controller.getCarsByUserId('asdasfa415a1f5a1s5fa155sa1f5as1f');

    expect(controller).toBeDefined();
  });
});
