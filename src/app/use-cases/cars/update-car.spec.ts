import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UpdateCar } from './update-car';
import { CreateCar } from './create-car';
import { CarNotFoundError } from '../../errors/cars/car-not-found';

describe('UpdateCar', () => {
  let carsRepository: InMemoryCarsRepository;
  const usersRepository = new InMemoryUsersRepository();
  let updateCar: UpdateCar;
  let createCar: CreateCar;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    updateCar = new UpdateCar(carsRepository, usersRepository);
    createCar = new CreateCar(carsRepository, usersRepository);
  });

  it('should update a car when the id exists', async () => {
    const car = {
      props: {
        userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
        model: 'Gol',
        make: 'Volkswagen',
        year: '2010',
        color: 'Preto',
        licensePlate: 'ABC1234',
        imageUrl: '',
        category: 'car',
      },
    };

    await createCar.execute(car.props);

    await updateCar.execute(1, {
      model: 'Golf',
    });

    const updatedCar = await carsRepository.getCarById(1);

    expect(updatedCar).toHaveProperty('props.model', 'Golf');
  });

  it('should throw a CarNotFoundError when the id does not exist', async () => {
    try {
      await updateCar.execute(1, {
        model: 'Golf',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CarNotFoundError);
      expect(error.message).toBe('Car not found');
    }
  });
});
