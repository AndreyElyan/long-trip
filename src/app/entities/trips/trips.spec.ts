import { Trips } from './trips';

describe('Trips', () => {
  it('should create a trip', () => {
    const trip = new Trips({
      origin: 'valid_origin',
      destination: 'valid_destination',
      lat: 0,
      lng: 0,
      latDest: 0,
      lngDest: 0,
      date: '19/07/1930',
      time: '19:00',
      distance: 1000,
      duration: 0.3,
      cost: 12.0,
      status: 'valid_status',
      seats: 3,
      carInfoId: 1,
      driverId: 'valid_driverId',
      passengers: ['valid_passengerId'],
      description: 'valid_description',
      createdAt: new Date(),
      updatedAt: new Date(),
      tripType: 'DRIVER',
    });
    expect(trip).toBeInstanceOf(Trips);
  });
});
