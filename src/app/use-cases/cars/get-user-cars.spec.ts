import { InMemoryCarsRepository } from '@test/repositories/in-memory-cars-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserHasNoCarException } from '../../errors/cars/user-has-no-car';
import { UserNotFoundError } from '../../errors/users/user-not-found';
import { GetUserCars } from './get-user-cars';
import { CreateCar } from './create-car';

describe('GetUserCars', () => {
  let getUserCars: GetUserCars;
  let createCar: CreateCar;
  let carsRepository: InMemoryCarsRepository;
  let usersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    usersRepository = new InMemoryUsersRepository();
    getUserCars = new GetUserCars(carsRepository, usersRepository);
    createCar = new CreateCar(carsRepository, usersRepository);
  });

  it('should return the cars of the user', async () => {
    const userId = carsRepository.user_response.id;

    const createdCar = await createCar.execute({
      userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1236',
      imageUrl: '',
      category: 'car',
    });

    const userCars = await getUserCars.execute(userId);

    expect(userCars).toEqual([createdCar]);
  });

  it('should throw an error if the user does not exist', async () => {
    const userId = '1';

    await expect(getUserCars.execute(userId)).rejects.toThrowError(
      UserNotFoundError,
    );
  });

  it('should throw an error if the user has no cars', async () => {
    const userId = carsRepository.user_response.id;

    await expect(getUserCars.execute(userId)).rejects.toThrowError(
      UserHasNoCarException,
    );
  });
});
