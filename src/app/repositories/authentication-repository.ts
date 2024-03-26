import { Authentication } from '@app/entities/authentication/authentication';

export abstract class AuthenticationRepository {
  abstract validate(userRequest: Authentication);
  abstract login(email: string, password: string);
}
