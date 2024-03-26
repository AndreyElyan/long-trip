import { DriverNotFoundError } from '@app/errors/users/driver-not-found';
import { EvaluateYourselfError } from '@app/errors/users/evaluate-yourself';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { CreateEvaluationBody } from '@infra/http/dtos/evaluations/create-evaluation.entity';
import { Evaluations } from '@prisma/client';

export class InMemoryEvaluationRepository implements EvaluationsRepository {
  public evaluations = [];

  public evaluationRequest;

  public user_response = {
    id: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    tripId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    email: 'andrey@gmail.com',
    name: 'Andrey',
    lastName: 'Andrade',
    dateOfBirth: '19/07/1930',
  };

  public evaluation_response = {
    id: 0,
    evaluation: 0,
    description: '',
    tripId: '',
    passengerId: '',
    driverId: '',
  };

  async create(request: CreateEvaluationBody): Promise<Evaluations> {
    const userExists = this.user_response.id === request.passengerId;

    if (!userExists) throw new UserNotFoundError();

    const driverExists = this.user_response.id === request.driverId;

    if (!driverExists) throw new DriverNotFoundError();

    if (request.passengerId === request.driverId) {
      throw new EvaluateYourselfError();
    }

    this.evaluation_response = {
      id: 0,
      evaluation: request.evaluation,
      description: request.description,
      tripId: request.tripId,
      passengerId: request.passengerId,
      driverId: request.driverId,
    };

    this.evaluations.push(this.evaluation_response);

    return this.evaluation_response[0];
  }

  async getEvaluationByDriverId(driverId: string): Promise<Evaluations[]> {
    const evaluations = this.evaluations.filter(
      (evaluation) => evaluation.driverId === driverId,
    );

    return evaluations;
  }
}
