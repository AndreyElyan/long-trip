import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { AddressClient } from '@infra/http/clients/external-address/address.client';
import { AddressRequestDto } from '@infra/http/dtos/address/address-request.entity';

import {
  Controller, Get, HttpStatus, Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { catchError, from, map } from 'rxjs';

import { createClient, Client } from '@google/maps';

const googleMapsClient: Client = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise,
});

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private client: AddressClient) {}

  @Get('search')
  @ApiOperation({ summary: 'Get address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async getAddress(@Query() body: AddressRequestDto) {
    const { address } = body;

    if (!address) {
      throw new Error('O endereço é obrigatório');
    }

    const response = await this.client.getAddress(address);

    return response;
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get address with autocomplete' })
  autoComplete(@Query('input') input: string) {
    if (!input) {
      throw new Error('O parâmetro input é obrigatório');
    }

    const options = {
      input,
      types: ['address'],
    };

    return from(googleMapsClient.placesAutoComplete(options).asPromise()).pipe(
      map((response: any) => {
        if (
          response.json.status !== 'OK'
          || response.json.predictions.length === 0
        ) {
          throw new Error('Nenhum endereço encontrado');
        }

        return response.json.predictions.map((prediction: any) => ({
          description: prediction.description,
          placeId: prediction.place_id,
        }));
      }),
      catchError(() => {
        throw new Error('Não foi possível buscar as sugestões de endereço');
      }),
    );
  }
}
