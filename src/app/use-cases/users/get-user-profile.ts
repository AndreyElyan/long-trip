import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@app/repositories/users-repository';
import { EvaluationsRepository } from '@app/repositories/evaluations-repository';
import { UserDataViewModel } from '@infra/http/view-models/users/user-data-view-model';
import { UserNotFoundError } from '../../errors/users/user-not-found';

export interface GetUserProfileRequest {
  id: string;
}

export interface GetUserProfileResponse {
  user;
  evaluations;
}

@Injectable()
export class GetUserProfile {
  constructor(
    private usersRepository: UsersRepository,
    private evaluationsRepository: EvaluationsRepository,
  ) {}

  async execute(
    request: GetUserProfileRequest,
  ): Promise<GetUserProfileResponse> | null {
    const user = await this.usersRepository
      .getUserById(request.id)
      .then((p) => UserDataViewModel.toResponse(p));
    const evaluations
      = await this.evaluationsRepository.getEvaluationByDriverId(request.id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return { user, evaluations };
  }
}
