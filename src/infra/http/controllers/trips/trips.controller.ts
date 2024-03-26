import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';

import { CreateTrip } from '@app/use-cases/trips/create-trip';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '@helpers/swagger/bad-request.swagger';
import { ConflictSwagger } from '@helpers/swagger/conflict-swagger';

import { CreateTripBody } from '@infra/http/dtos/trips/create-trip-body.entity';
import { TripCreateDataViewModel } from '@infra/http/view-models/trips/trip-create-data-view.model';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { GetTripsByUserId } from '@app/use-cases/trips/get-trips-by-userid';
import { AssignTripToUser } from '@app/use-cases/trips/assign-trip-to-user';
import { GetTripsByAddress } from '@app/use-cases/trips/get-trips-by-address';
import { GetDetailsOfTrip } from '@app/use-cases/trips/get-details-of-trip';
import { CancelTrip } from '@app/use-cases/trips/cancel-trip';
import { EventsGateway } from '@infra/events/events.gateway';
import { GetTripsByType } from '@app/use-cases/trips/get-trips-by-type';
import { GetTripProfile } from '@app/use-cases/trips/get-trip-profile';
import { AssignTripBody } from '@infra/http/dtos/trips/assign-trip-to-user';
import { RemoveUserFromTripBody } from '@infra/http/dtos/trips/remove-user-from-trip';
import { RemoveUserFromTrip } from '@app/use-cases/trips/remove-user-from-trip';
import { GetTripsByPassengerId } from '@app/use-cases/trips/get-trips-by-passengerid';
import { AcceptPassengerBody } from '@infra/http/dtos/trips/accept-passenger-dto';
import { AcceptPassenger } from '@app/use-cases/trips/accept-passenger';
import { descriptionGetTripsByAddress } from './constants';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(
    private createTrip: CreateTrip,
    private getTripsByUser: GetTripsByUserId,
    private getTripsByPassenger: GetTripsByPassengerId,
    private getTripsByAddress: GetTripsByAddress,
    private getDetailsOfTripMethod: GetDetailsOfTrip,
    private getTripProfileMethod: GetTripProfile,
    private assignTripToUser: AssignTripToUser,
    private removeFromTrip: RemoveUserFromTrip,
    private getTripsByTripType: GetTripsByType,
    private acceptPassenger: AcceptPassenger,
    private cancelTrip: CancelTrip,
    private eventsGateway: EventsGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({
    status: 201,
    description: 'Trip created',
    type: TripCreateDataViewModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    type: ConflictSwagger,
  })
  async create(@Body() body: CreateTripBody) {
    const response = await this.createTrip.execute(body);

    this.eventsGateway.server.emit('trips', response);

    return TripCreateDataViewModel.toResponse(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('driver/:userId')
  @ApiOperation({ summary: 'Get trips by driver id' })
  @ApiResponse({
    status: 200,
    description: 'Trips found',
    type: TripCreateDataViewModel,
  })
  async getTripsByUserId(@Param('userId') userId: string) {
    const response = await this.getTripsByUser.execute({ userId });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('passenger/:userId')
  @ApiOperation({ summary: 'Get trips by driver id' })
  @ApiResponse({
    status: 200,
    description: 'Trips found',
    type: TripCreateDataViewModel,
  })
  async getTripsByPassengerId(@Param('userId') passengerId: string) {
    const response = await this.getTripsByPassenger.execute({ passengerId });
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('type/:tripType')
  @ApiOperation({ summary: 'Get trips by user id' })
  @ApiResponse({
    status: 200,
    description: 'Trips found',
    type: TripCreateDataViewModel,
  })
  async getTripsDetailsByTripType(@Param('tripType') tripType: string) {
    const response = await this.getTripsByTripType.execute({ tripType });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/origin/:originAddress/destination/:destinationAddress/seats/:seats/')
  @ApiOperation({ summary: 'Get trips by adress' })
  @ApiResponse({
    status: 200,
    description: 'Trips found',
    type: TripCreateDataViewModel,
  })
  async getTripsByAddressCourse(
  @Param('originAddress') originAddress: string,
    @Param('destinationAddress') destinationAddress: string,
    @Param('seats') seats: number,
  ) {
    const response = await this.getTripsByAddress.execute({
      originAddress,
      destinationAddress,
      seats,
    });
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get(
    '/origin/:originAddress/destination/:destinationAddress/seats/:seats/:preferences',
  )
  @ApiOperation({
    summary: 'Get trips by adress with filters',
    description: descriptionGetTripsByAddress,
  })
  @ApiResponse({
    status: 200,
    description: 'Trips found',
    type: TripCreateDataViewModel,
  })
  async getTripsByAddressCourseWithFilters(
  @Param('originAddress') originAddress: string,
    @Param('destinationAddress') destinationAddress: string,
    @Param('seats') seats: number,
    @Param('preferences') preferences: string | null | undefined,
  ) {
    const filters = preferences.split('&');
    const response = await this.getTripsByAddress.execute({
      originAddress,
      destinationAddress,
      seats,
      filters,
    });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:tripId')
  @ApiOperation({ summary: 'Get details of a trip' })
  @ApiResponse({
    status: 200,
    description: 'Trip found',
    type: TripCreateDataViewModel,
  })
  async getDetailsOfTrip(@Param('tripId') tripId: string) {
    const response = await this.getDetailsOfTripMethod.execute({ tripId });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cancel/:tripId')
  @ApiOperation({ summary: 'Cancel a trip' })
  @ApiResponse({
    status: 200,
    description: 'Trip canceled',
  })
  async cancelTripMethod(@Param('tripId') tripId: string) {
    await this.cancelTrip.execute({ tripId });
    return { message: 'Trip canceled' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:tripId')
  @ApiOperation({
    summary: 'Get profile of a trip',
    description:
      'Use tripId to retrieve info about the trip driver, car and trip itself.',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip found',
  })
  async getTripProfile(@Param('tripId') tripId: string) {
    const response = await this.getTripProfileMethod.execute({ tripId });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/assign/')
  @ApiOperation({
    summary: 'Get profile of a trip',
    description:
      'Use tripId to retrieve info about the trip driver, car and trip itself.',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip found',
  })
  async assignTrip(@Body() request: AssignTripBody) {
    const response = await this.assignTripToUser.execute(request);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove/')
  @ApiOperation({
    summary: 'Get profile of a trip',
    description:
      'Use tripId to retrieve info about the trip driver, car and trip itself.',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip found',
  })
  async cancelUserTripMethod(@Body() request: RemoveUserFromTripBody) {
    await this.removeFromTrip.execute(request);
    return { message: 'User removed from trip' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept-passenger')
  @ApiOperation({ summary: 'Accept passenger' })
  @ApiResponse({
    status: 200,
    description: 'Passenger accepted',
  })
  async acceptPassengerMethod(@Body() request: AcceptPassengerBody) {
    await this.acceptPassenger.execute(request);
    return { message: 'Passenger accepted' };
  }
}
