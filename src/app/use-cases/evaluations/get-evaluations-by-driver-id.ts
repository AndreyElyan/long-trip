import { DriverNotFoundError } from '@app/errors/users/driver-not-found';

import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetEvaluationsByDriverId {
  constructor(
    private evaluationsRepository: EvaluationsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(driverId: string) {
    const driver = await this.usersRepository.getUserById(driverId);

    if (!driver) {
      throw new DriverNotFoundError();
    }

    const response = await this.evaluationsRepository.getEvaluationByDriverId(
      driverId,
    );

    return response;
  }
}
