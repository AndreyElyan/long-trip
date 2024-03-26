import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CarNotFoundError } from '../../errors/cars/car-not-found';
import { CreateCar } from './create-car';
import { DeleteCar } from './delete-car';

describe('DeleteCar', () => {
  let carsRepository: InMemoryCarsRepository;
  let usersRepository: InMemoryUsersRepository;
  let deleteCar: DeleteCar;
  let createCar: CreateCar;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    usersRepository = new InMemoryUsersRepository();
    deleteCar = new DeleteCar(carsRepository);
    createCar = new CreateCar(carsRepository, usersRepository);
  });

  it('should delete a car', async () => {
    const car = {
      userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1234',
      imageUrl: '',
      category: 'car',
    };

    await createCar.execute(car);

    const expectedCarResponse = {
      props: {
        id: 1,
        ...car,
      },
    };

    const deletedCar = await deleteCar.execute(1);

    expect(deletedCar).toEqual(expectedCarResponse);
  });

  it('should throw a CarNotFoundError when trying to delete a car that does not exist', async () => {
    try {
      await deleteCar.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CarNotFoundError);
    }
  });
});
