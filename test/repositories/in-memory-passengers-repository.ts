import { PassengerTripsRepository } from '@app/repositories/passenger-trips-repository';

export class InMemoryPassengerTripsRepository
  implements PassengerTripsRepository
{
  public trips: CreateTripUserDto[] = [];

  public tripsRequest;

  public create_response = {
    id: 6,
    usersId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
    tripsId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
  };

  public trips_response = [
    {
      trips: {
        id: 2,
        tripId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
        origin: 'Canoas, RS',
        destination: 'Gramado, RS',
        lat: -4525,
        lng: -32452345,
        latDest: 0,
        lngDest: 0,
        date: '19/07/1930',
        time: '13:00',
        distance: 0,
        duration: 0,
        cost: 39,
        status: 'pending',
        seats: 5,
        carInfoId: 1,
        driverId: 'e3c698fc-a755-4083-a8e8-30a8cc82680f',
        description: 'Com paradas nos principais pontos turísticos.',
        createdAt: '2023-04-04T19:34:07.730Z',
        updatedAt: '2023-04-04T19:34:07.730Z',
        tripType: 'DRIVER',
      },
      passengers: [
        {
          id: 5,
          usersId: '206d8f16-64e7-4a75-b044-bcb46f0e7d0a',
          tripsId: 'clg2nsb5e0000tz3810ffwh87',
          status: 'pending',
        },
        {
          id: 6,
          usersId: 'b272eb9f-b998-4308-a0f6-a95ab25045ee',
          tripsId: 'clg2nsb5e0000tz3810ffwh87',
        },
      ],
    },
  ];

  async getTripByPassenger(id: string) {
    return this.trips_response.filter((trip) =>
      trip.passengers.some((p) => p.usersId === id),
    );
  }

  async getPassengersByTrip(id: string) {
    const tripResponse = this.trips_response.find(
      (trip) => trip.trips.tripId === id,
    );
    if (tripResponse) {
      return tripResponse.passengers;
    }
    return null;
  }

  async removePassengerFromTrip(usersId: string, tripsId: string) {
    const tripRemove = this.trips_response.find(
      (trip) => trip.trips.tripId === tripsId,
    );
    if (tripRemove) {
      tripRemove.passengers = tripRemove.passengers.filter(
        (p) => p.usersId !== usersId,
      );
      return tripRemove;
    }
    throw new Error('Trip not found');
  }

  async create(passenger: CreateTripUserDto) {
    const tripCreate = this.trips_response.find(
      (trip) => trip.trips.tripId === passenger.tripId,
    );
    if (tripCreate) {
      tripCreate.passengers.push({
        id: 0,
        usersId: passenger.passengerId,
        tripsId: passenger.tripId,
      });
      return tripCreate.trips;
    }
    return new Error("TRIP DOESN'T EXIST");
  }

  async acceptPassenger(tripsId: string, usersId: string) {
    const tripAccept = this.trips_response.find(
      (trip) => trip.trips.tripId === tripsId,
    );
    if (tripAccept) {
      tripAccept.passengers = tripAccept.passengers.map((p) => {
        if (p.usersId === usersId) {
          return {
            ...p,
            status: 'accepted',
          };
        }
        return p;
      });
      return tripAccept.trips;
    }
    return new Error("TRIP DOESN'T EXIST");
  }
}

// Define CreateTripUserDto interface if not already defined
interface CreateTripUserDto {
  passengerId: string;
  tripId: string;
}
