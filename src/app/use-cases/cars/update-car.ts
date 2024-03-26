import { Injectable } from '@nestjs/common';

import { CarsRepository } from '@app/repositories/cars-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { CarNotFoundError } from '@app/errors/cars/car-not-found';
import { UserNotFoundError } from '../../errors/users/user-not-found';

interface UpdateCarRequest {
  userId?: string;
  model?: string;
  make?: string;
  year?: string;
  color?: string;
  licensePlate?: string;
  imageUrl?: string;
}

export interface UpdateCarResponse {
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
export class UpdateCar {
  constructor(
    private carsRepository: CarsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    id: number,
    request: UpdateCarRequest,
  ): Promise<UpdateCarResponse> {
    const carExists = await this.carsRepository.getCarById(id);

    if (!carExists) throw new CarNotFoundError();

    if (request.userId) {
      const userExists = await this.usersRepository.getUserById(request.userId);

      if (!userExists) throw new UserNotFoundError();
    }

    const car = await this.carsRepository.updateCar(id, {
      ...carExists.props,
      ...request,
    });

    return car.props;
  }
}
