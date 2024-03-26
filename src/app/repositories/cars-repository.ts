import { CreateCarBody } from '@infra/http/dtos/cars/create-car-body.entity';
import { UpdateCarDto } from '@infra/http/dtos/cars/update-car.entity';

export abstract class CarsRepository {
  abstract create(car: CreateCarBody);

  abstract getCarById(id: number);

  abstract updateCar(id: number, car: UpdateCarDto);

  abstract deleteCar(id: number);

  abstract getUserCars(userId: string);
}
