import { Injectable } from '@nestjs/common';

import { CarsRepository } from '@app/repositories/cars-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { UserNotFoundError } from '@app/errors/users/user-not-found';

export interface CreateCarRequest {
  userId: string;
  category: string;
  model: string;
  make: string;
  year: string;
  color: string;
  licensePlate: string;
  imageUrl: string;
}

export interface CreateCarResponse {
  props: {
    id: number;
    userId: string;
    model: string;
    make: string;
    year: string;
    color: string;
    licensePlate: string;
    imageUrl: string;
  };
}

@Injectable()
export class CreateCar {
  constructor(
    private carsRepository: CarsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateCarRequest): Promise<CreateCarResponse> {
    const {
      userId,
      category,
      model,
      make,
      year,
      color,
      licensePlate,
      imageUrl,
    } = request;
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const carRequest = {
      model,
      make,
      year,
      color,
      licensePlate,
      imageUrl,
      userId: user.id,
      category,
    };

    const car = await this.carsRepository.create(carRequest);

    const carResponse: CreateCarResponse = {
      ...car.props,
    };

    return carResponse;
  }
}
