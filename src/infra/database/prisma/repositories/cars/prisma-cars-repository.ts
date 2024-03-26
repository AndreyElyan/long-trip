import { Injectable } from '@nestjs/common';

import { CarsRepository } from '@app/repositories/cars-repository';
import { Cars } from '@app/entities/cars/cars';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaCarsRepository implements CarsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(car: Cars): Promise<Cars> {
    const {
      userId,
      category,
      model,
      make,
      year,
      color,
      licensePlate,
      imageUrl,
    } = car;

    const carResponse = await this.prismaService.userCarInfo.create({
      data: {
        userId,
        category,
        model,
        make,
        year,
        color,
        licensePlate,
        imageUrl,
      },
    });

    return new Cars({
      ...carResponse,
    });
  }

  async getCarById(id: number): Promise<Cars> {
    const car = await this.prismaService.userCarInfo.findUnique({
      where: {
        id,
      },
    });

    return new Cars({
      ...car,
    });
  }

  async updateCar(id: number, car: Cars): Promise<Cars> {
    const {
      userId, model, make, year, color, licensePlate, imageUrl,
    } = car;

    const carResponse = await this.prismaService.userCarInfo.update({
      where: {
        id,
      },
      data: {
        userId,
        model,
        make,
        year,
        color,
        licensePlate,
        imageUrl,
      },
    });

    return new Cars({
      ...carResponse,
    });
  }

  async deleteCar(id: number): Promise<Cars> {
    const car = await this.prismaService.userCarInfo.delete({
      where: {
        id,
      },
    });

    return new Cars({
      ...car,
    });
  }

  async getUserCars(userId: string): Promise<Cars[]> {
    const cars = await this.prismaService.userCarInfo.findMany({
      where: {
        userId,
      },
    });

    return cars.map(
      (car) => new Cars({
        ...car,
      }),
    );
  }
}
