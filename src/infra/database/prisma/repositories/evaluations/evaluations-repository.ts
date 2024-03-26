/* eslint-disable no-param-reassign */
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { Injectable } from '@nestjs/common';
import { Evaluations } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaEvaluationRepository implements EvaluationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(evaluation: Evaluations): Promise<Evaluations> {
    if (evaluation.evaluation > 5 || evaluation.evaluation < 1) {
      throw new Error('Evaluation must be between 1 and 5');
    }

    const evaluationResponse = await this.prismaService.evaluations.create({
      data: {
        evaluation: evaluation.evaluation,
        description: evaluation.description,
        tripId: evaluation.tripId,
        passengerId: evaluation.passengerId,
        driverId: evaluation.driverId,
      },
    });

    return evaluationResponse;
  }

  async getEvaluationByDriverId(id: string) {
    const evaluations = await this.prismaService.evaluations.findMany({
      where: {
        driverId: id,
      },
    });

    const countOfEValuations = evaluations.length;

    const evaluationsByNumber = evaluations.reduce((acc, evaluation) => {
      if (acc[evaluation.evaluation]) {
        acc[evaluation.evaluation] += 1;
      } else {
        acc[evaluation.evaluation] = 1;
      }

      return acc;
    }, {});

    const descriptionEvaluationByPassenger = evaluations.reduce(
      (acc, evaluation) => {
        if (acc[evaluation.passengerId]) {
          acc[evaluation.passengerId].push(evaluation.description);
        } else {
          acc[evaluation.passengerId] = [evaluation.description];
        }

        return acc;
      },
      {},
    );

    const average
      = evaluations.reduce((acc, evaluation) => {
        acc += evaluation.evaluation;

        return acc;
      }, 0) / countOfEValuations;

    const tripsAlreadyEvaluated = evaluations.map(
      (evaluation) => evaluation.tripId,
    );

    return {
      id,
      countOfEValuations,
      descriptionEvaluationByPassenger,
      tripsAlreadyMade: tripsAlreadyEvaluated,
      evaluationsByNumber,
      average: average.toFixed(1),
    };
  }
}
