import { DriverNotFoundError } from '@app/errors/users/driver-not-found';
import { EvaluateYourselfError } from '@app/errors/users/evaluate-yourself';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';

interface CreateEvaluationRequest {
  evaluation: number;
  description: string;
  tripId: string;
  passengerId: string;
  driverId: string;
}
@Injectable()
export class CreateEvaluation {
  constructor(
    private evaluationsRepository: EvaluationsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateEvaluationRequest): Promise<void> {
    const { passengerId, driverId } = request;

    const user = await this.usersRepository.getUserById(passengerId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const driver = await this.usersRepository.getUserById(driverId);

    if (!driver) {
      throw new DriverNotFoundError();
    }

    if (passengerId === driverId) {
      throw new EvaluateYourselfError();
    }

    await this.evaluationsRepository.create(request);
  }
}
