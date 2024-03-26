import { Injectable } from '@nestjs/common';

import { CarsRepository } from '@app/repositories/cars-repository';
import { CarNotFoundError } from '@app/errors/cars/car-not-found';

export interface CarResponse {
  id: number;
  userId: string;
  model: string;
  make: string;
  year: string;
  color: string;
  licensePlate: string;
  imageUrl: string;
}

@Injectable()
export class GetCarById {
  constructor(private carsRepository: CarsRepository) {}

  async execute(id: number): Promise<CarResponse> {
    const carExists = await this.carsRepository.getCarById(id);

    if (!carExists) throw new CarNotFoundError();

    return carExists;
  }
}
