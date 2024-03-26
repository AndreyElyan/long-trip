import { TokenExpired } from './token-expired';

describe('Token x', () => {
  it('should be an instance of Error', () => {
    expect(new TokenExpired()).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    expect(new TokenExpired().name).toEqual('TokenExpired');
  });

  it('should have the correct message', () => {
    expect(new TokenExpired().message).toEqual('Expired Token');
  });
});
