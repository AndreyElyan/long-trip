import { CarsRepository } from '@app/repositories/cars-repository';
import { CreateCarBody } from '@infra/http/dtos/cars/create-car-body.entity';
import { UpdateCarDto } from '@infra/http/dtos/cars/update-car.entity';
import { Users } from '@prisma/client';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { CarNotFoundError } from '@app/errors/cars/car-not-found';
import { CarResponse } from '@app/use-cases/cars/get-user-cars';
import { UserHasNoCarException } from '@app/errors/cars/user-has-no-car';

export class InMemoryCarsRepository implements CarsRepository {
  public cars: CarResponse[] = [];

  public carRequest: CreateCarBody;

  public user_response: Users = {
    id: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    email: 'andrey@gmail.com',
    name: 'Andrey',
    lastName: 'Silveira',
    dateOfBirth: '19/07/1930',
    gender: 'Masculino',
    password: 'password',
    cellPhone: '51985809513',
    conversation: true,
    music: true,
    smoking: true,
    pets: true,
    hadVaccines: true,
    eatFood: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: '',
    resetToken: 0,
    resetTokenExpiry: undefined,
  };

  public car_response_1: CarResponse = {
    props: {
      id: 1,
      userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1236',
      imageUrl: '',
      category: 'car',
    },
  };

  public car_response_2: CarResponse = {
    props: {
      id: 2,
      userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      model: 'Golf',
      make: 'Volkswagen',
      year: '2020',
      color: 'Branco',
      licensePlate: 'ABC1244',
      imageUrl: '',
      category: 'car',
    },
  };

  async create(car: CreateCarBody) {
    const body = {
      props: {
        id: 1,
        ...car,
      },
    };
    const userExists = this.user_response.id === car.userId;

    if (!userExists) throw new UserNotFoundError();

    this.cars.push(...this.cars, body);

    return body;
  }

  async getCarById(id: number) {
    const carExists = this.cars.find((car) => car.props.id === id);

    if (!carExists) throw new CarNotFoundError();

    return carExists;
  }

  async updateCar(id: number, car: UpdateCarDto) {
    const carExists = this.cars.find((vehicle) => vehicle.props.id === id);

    if (!carExists) throw new CarNotFoundError();

    const carUpdated = {
      props: {
        ...carExists.props,
        ...car,
      },
    };

    this.cars = this.cars.filter((vehicle) => vehicle.props.id !== id);

    this.cars.push(...this.cars, carUpdated);

    return carUpdated;
  }

  async deleteCar(id: number) {
    const carExists = this.cars.find((car) => car.props.id === id);

    if (!carExists) throw new CarNotFoundError();

    this.cars = this.cars.filter((car) => car.props.id !== id);

    return carExists;
  }

  async getUserCars(userId: string) {
    const userExists = this.user_response.id === userId;

    if (!userExists) throw new UserNotFoundError();

    const cars = this.cars.filter((car) => car.props.userId === userId);

    if (cars.length === 0) throw new UserHasNoCarException();

    return cars;
  }
}
