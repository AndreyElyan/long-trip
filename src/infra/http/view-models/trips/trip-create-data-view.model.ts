import { CreateTripResponse } from '@app/use-cases/trips/create-trip';

export class TripCreateDataViewModel {
  static toResponse(trip: CreateTripResponse) {
    return {
      id: trip.id,
      tripId: trip.tripId,
      origin: trip.origin,
      destination: trip.destination,
      lat: trip.lat,
      lng: trip.lng,
      latDest: trip.latDest,
      lngDest: trip.lngDest,
      date: trip.date,
      time: trip.time,
      cost: trip.cost,
      seats: trip.seats,
      carInfoId: trip.carInfoId,
      driverId: trip.driverId,
      description: trip.description,
    };
  }
}
