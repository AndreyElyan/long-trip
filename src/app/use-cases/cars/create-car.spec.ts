import { Cars } from '@app/entities/cars/cars';
import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateCar } from './create-car';
import { UserNotFoundError } from '../../errors/users/user-not-found';

describe('CreateCar', () => {
  const carsRepository = new InMemoryCarsRepository();
  const usersRepository = new InMemoryUsersRepository();
  const createCar = new CreateCar(carsRepository, usersRepository);

  it('should be able to create a car', async () => {
    const car1 = new Cars({
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1236',
      userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      imageUrl: '',
      category: 'car',
    });

    const createdCar = await createCar.execute(car1);

    await createCar.execute(car1);

    expect(carsRepository.car_response_1.props).toEqual(createdCar);

    expect(carsRepository.cars).toHaveLength(3);
  });

  it('should not be able to create a car with a non-existing user', async () => {
    const car = new Cars({
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1236',
      userId: 'non-existing-user',
      imageUrl: '',
      category: 'car',
    });

    await expect(createCar.execute(car)).rejects.toThrow(UserNotFoundError);
  });
});
