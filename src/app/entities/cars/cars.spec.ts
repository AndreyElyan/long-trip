import { Cars } from './cars';

describe('Cars', () => {
  it('should create a car', () => {
    const car = new Cars({
      userId: '123',
      model: 'Model',
      make: 'Make',
      year: '2020',
      color: 'Red',
      licensePlate: 'ABC1234',
      imageUrl: '',
      category: 'car',
    });
    expect(car).toBeInstanceOf(Cars);
  });
});
