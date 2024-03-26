import { Injectable } from '@nestjs/common';

import { TripsRepository } from '@app/repositories/trips-repository';

import { Trips } from '@prisma/client';
import { UsersRepository } from '@app/repositories/users-repository';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaTripsRepository implements TripsRepository {
  constructor(
    private prismaService: PrismaService,
    private usersRepository: UsersRepository,
  ) {}

  normalize (str: string){
    return str.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  async create(trip: Trips): Promise<Trips> {
    const tripResponse = await this.prismaService.trips.create({
      data: {
        origin: this.normalize(trip.origin),
        destination: this.normalize(trip.destination),
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
        distance: trip.distance,
        duration: trip.duration,
        status: trip.status,
        tripType: trip.tripType,
      },
    });

    return tripResponse;
  }

  async getTripsByUserId(userId: string): Promise<Trips[]> {
    const statusCancelled = 'canceled';
    const trips = await this.prismaService.trips.findMany({
      where: {
        driverId: userId,
        status: { not: statusCancelled },
      },
    });

    return trips;
  }

  async getTripsByAddress(
    originAddress: string,
    destinationAddress: string,
    seats: number,
    preferences?: string[],
  ): Promise<Trips[]> {
    interface WhereQuery {
      origin: { contains: string };
      destination: { contains: string };
      status: { equals: string };
      seats: { gt: number };
      date?: { equals: string };
    }

    const where: WhereQuery = {
      origin: { contains: this.normalize(originAddress)},
      destination: { contains: this.normalize(destinationAddress)},
      status: { equals: 'pending' },
      seats: { gt: seats },
    };

    const mappedPreferences = this.getPreferences(preferences);
    const userPreferences = mappedPreferences?.filters;
    const orderByPreferences = mappedPreferences?.orderByArray;
    const date = mappedPreferences?.date;

    if (date) {
      where.date = { equals: date };
    }

    let trips = await this.prismaService.trips.findMany({
      where: { ...where },
      orderBy: orderByPreferences,
    });

    if (userPreferences && Object.keys(userPreferences).length > 0) {
      const filteredTrips = await Promise.all(
        trips.map(async (trip) => {
          const pref = await this.usersRepository.findPreferencesByUserId(
            trip.driverId,
          );
          const match = Object.keys(userPreferences).every((key) => {
            return userPreferences[key] === pref[key];
          });
          return match ? trip : null;
        })
      );
      trips = filteredTrips.filter((trip) => trip !== null);
    }

    return trips;
  }

  convertDate(dateString) {
    const [day, month, year] = dateString.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  getPreferences(preferences) {
    const orderByArray = [];
    const filters = [];
    let date = null;

    if (!preferences || Object.keys(preferences).length === 0) return null;

    const preferencesMapping = {
      conversation: true,
      music: true,
      smoking: true,
      pets: true,
      hadVaccines: true,
      eatFood: true,
    };

    const orderByMapping = {
      'order-by-value': { cost: 'asc' },
      'order-by-distance': { distance: 'asc' },
      'order-by-duration': { duration: 'asc' },
    };

    preferences.forEach((pref) => {
      if (pref.match(/^\d{2}-\d{2}-\d{4}$/)) {
        date = this.convertDate(pref);
      }

      if (preferencesMapping[pref]) {
        filters[pref] = preferencesMapping[pref];
      }

      const mapping = orderByMapping[pref];
      if (mapping) {
        orderByArray.push(mapping);
      }
    });

    return {
      date,
      filters,
      orderByArray,
    };
  }

  async getDetailsOfTrip(tripId: string): Promise<Trips> {
    const trip = await this.prismaService.trips.findUnique({
      where: {
        tripId,
      },
    });

    return trip;
  }

  async cancelTrip(tripId: string): Promise<void> {
    await this.prismaService.trips.update({
      where: {
        tripId,
      },
      data: {
        status: 'canceled',
      },
    });
  }

  async getTripsByType(tripType: string): Promise<Trips[]> {
    const trips = await this.prismaService.trips.findMany({
      where: {
        tripType,
      },
    });
    return trips;
  }
}
