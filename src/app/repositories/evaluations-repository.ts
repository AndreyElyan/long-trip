import { DriverEvaluationDto } from '@infra/http/dtos/drivers/driverEvaluation';

export abstract class EvaluationsRepository {
  abstract create(trip: DriverEvaluationDto);

  abstract getEvaluationByDriverId(id: string);
}
