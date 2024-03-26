import { InvalidToken } from './invalid-token';

describe('InvalidToken', () => {
  it('should be an instance of Error', () => {
    expect(new InvalidToken()).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    expect(new InvalidToken().name).toEqual('InvalidToken');
  });

  it('should have the correct message', () => {
    expect(new InvalidToken().message).toEqual('Invalid token');
  });
});
