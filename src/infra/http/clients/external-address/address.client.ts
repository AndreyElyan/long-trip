import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { catchError, from, map } from 'rxjs';
import { createClient, Client, GeocodingResponse } from '@google/maps';

const googleMapsClient: Client = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise,
});

@Injectable()
export class AddressClient {
  constructor(private readonly http: HttpService) {}

  async getAddress(address: string) {
    return from(googleMapsClient.geocode({ address }).asPromise()).pipe(
      map((response: GeocodingResponse) => {
        if (
          response.json.status !== 'OK'
          || response.json.results.length === 0
        ) {
          throw new Error('Endereço não encontrado');
        }
        const formattedAddress = response.json.results;
        return formattedAddress;
      }),
      catchError(() => {
        throw new Error('Não foi possível buscar o endereço');
      }),
    );
  }

  private getRequestHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip,deflate,compress',
    };
  }

  private getURL(address: string) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  }
}
