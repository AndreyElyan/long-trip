import { Injectable } from '@nestjs/common';
import { CarsRepository } from '@app/repositories/cars-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { UserNotFoundError } from '../../errors/users/user-not-found';
import { UserHasNoCarException } from '../../errors/cars/user-has-no-car';

export interface CarResponse {
  props: {
    id: number;
    userId: string;
    model: string;
    make: string;
    year: string;
    color: string;
    licensePlate: string;
    imageUrl: string;
    category: string;
  };
}

@Injectable()
export class GetUserCars {
  constructor(
    private carsRepository: CarsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string): Promise<CarResponse[]> {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    const cars = await this.carsRepository.getUserCars(userId);

    if (cars.length === 0) throw new UserHasNoCarException();

    const userCars: CarResponse[] = cars.map((car: CarResponse) => {
      const {
        id, model, make, year, color, licensePlate, imageUrl, category,
      }
        = car.props;

      return {
        id,
        userId,
        model,
        make,
        year,
        color,
        licensePlate,
        imageUrl,
        category,
      };
    });

    return userCars;
  }
}
