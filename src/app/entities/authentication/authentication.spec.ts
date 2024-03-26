import { UserPassword } from '../users/user-information/user-password';

import { Authentication } from './authentication';

describe('Authenticate', () => {
  it('should be able to validate', () => {
    const credentials = new Authentication({
      email: 'r9@gmail.com',
      password: new UserPassword('12345678'),
    });

    expect(credentials).toBeTruthy();
  });
});
