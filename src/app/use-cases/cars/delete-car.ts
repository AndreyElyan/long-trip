import { Injectable } from '@nestjs/common';

import { CarsRepository } from '@app/repositories/cars-repository';
import { CarNotFoundError } from '@app/errors/cars/car-not-found';

export interface DeletedCarResponse {
  id: number;
  userId: string;
  model: string;
  make: string;
  year: string;
  color: string;
  licensePlate: string;
}

@Injectable()
export class DeleteCar {
  constructor(private carsRepository: CarsRepository) {}

  async execute(id: number): Promise<DeletedCarResponse> {
    const carExists = await this.carsRepository.getCarById(id);

    if (!carExists) {
      throw new CarNotFoundError();
    }

    await this.carsRepository.deleteCar(id);

    return carExists;
  }
}
