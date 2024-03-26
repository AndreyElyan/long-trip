import { TripsRepository } from '@app/repositories/trips-repository';
import {
  CreateTripRequest,
  CreateTripResponse,
} from '@app/use-cases/trips/create-trip';
import { UserNotFoundError } from '@app/errors/users/user-not-found';
import { CarNotFoundError } from '@app/errors/cars/car-not-found';
import { Trips } from '@app/entities/trips/trips';

export class InMemoryTripsRepository implements TripsRepository {
  public trips = [];

  public tripRequest: CreateTripRequest;

  public user_response = {
    id: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    tripId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    email: 'valid_email@email.com',
    name: 'valid_name',
    lastName: 'valid_lastName',
    dateOfBirth: '19/07/1930',
    gender: 'Male',
    password: 'valid_password',
    cellPhone: '51985809513',
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: '',
    resetToken: 0,
    resetTokenExpiry: undefined,
    vehicles: [
      {
        id: 1,
        userId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
        model: 'Gol',
        make: 'Volkswagen',
        year: '2010',
        color: 'Preto',
        licensePlate: 'ABC1236',
        imageUrl: '',
      },
    ],
  };

  public passengers = [
    {
      id: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      tripId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
      email: '',
      name: '',
      lastName: '',
      dateOfBirth: '',
    },
  ];

  public trip_response: CreateTripResponse = {
    id: 0,
    tripId: '',
    driverId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    carInfoId: 1,
    origin: 'Porto Alegre',
    destination: 'São Paulo',
    lat: 0,
    lng: 0,
    latDest: 0,
    lngDest: 0,
    date: '2021-07-19',
    time: '10:00',
    cost: 100,
    seats: 4,
    description: 'Viagem de teste',
    passengers: null,
    tripType: 'DRIVER',
  };

  async create(request: CreateTripRequest): Promise<Trips> {
    const trip = new Trips({ ...request });

    const driverExists = this.user_response.id === request.driverId;

    if (!driverExists) throw new UserNotFoundError();

    const carExists = this.user_response.vehicles[0].id === request.carInfoId;

    if (!carExists) throw new CarNotFoundError();

    this.trips.push(trip);
    return trip;
  }

  async getTripsByUserId(userId: string): Promise<Trips[]> {
    const trips = this.trips?.filter((trip) => trip.driverId === userId);

    return trips;
  }

  async getDetailsOfTrip(tripId: string): Promise<Trips> {
    const trip = this.trips.find((tripValue) => tripValue.id === tripId);

    return trip;
  }

  async cancelTrip(tripId: string): Promise<void> {
    const tripIndex = this.trips.findIndex((trip) => trip.id === tripId);

    this.trips.splice(tripIndex, 1);
  }

  async getTripsByAddress(originAddress: string, destinationAddress: string) {
    const trips = this.trips.filter(
      (trip) =>
        trip.origin.indexOf(originAddress) !== -1 &&
        trip.destination.indexOf(destinationAddress) !== -1,
    );

    return trips;
  }

  async getTripsByType(tripType: string): Promise<Trips[]> {
    const trips = this.trips.filter((trip) => trip.tripType === tripType);

    return trips;
  }
}
