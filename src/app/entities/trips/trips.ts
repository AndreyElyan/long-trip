import { Replace } from '@helpers/Replace';

export interface TripProps {
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  latDest: number;
  lngDest: number;
  date: string;
  time: string;
  distance?: number;
  duration?: number;
  cost: number;
  status?: string;
  seats: number;
  carInfoId: number;
  driverId: string;
  passengers?: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  tripType: string;
}

export class Trips implements TripProps {
  private props: Replace<TripProps, { _id?: number; _tripId?: string }>;

  private _id: number;

  private _tripId: string;

  constructor(props: TripProps) {
    this._id = 0;
    this._tripId = '';
    this.props = {
      ...props,
      status: props.status ?? 'pending',
      passengers: props.passengers ?? null,
      distance: props.distance ?? 0,
      duration: props.duration ?? 0,
      lat: props.lat ?? 0,
      lng: props.lng ?? 0,
      latDest: props.latDest ?? 0,
      lngDest: props.lngDest ?? 0,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      tripType: props.tripType,
    };
  }

  public get id(): number {
    return this._id;
  }

  public get tripId(): string {
    return this._tripId;
  }

  public set origin(origin: string) {
    this.props.origin = origin;
  }

  public get origin(): string {
    return this.props.origin;
  }

  public set lat(lat: number) {
    this.props.lat = lat;
  }

  public get lat(): number {
    return this.props.lat;
  }

  public set lng(lng: number) {
    this.props.lng = lng;
  }

  public get lng(): number {
    return this.props.lng;
  }

  public set latDest(lat: number) {
    this.props.latDest = this.latDest;
  }

  public get latDest(): number {
    return this.props.latDest;
  }

  public set lngDest(lngDest: number) {
    this.props.lngDest = lngDest;
  }

  public get lngDest(): number {
    return this.props.lngDest;
  }

  public set destination(destination: string) {
    this.props.destination = destination;
  }

  public get destination(): string {
    return this.props.destination;
  }

  public set date(date: string) {
    this.props.date = date;
  }

  public get date(): string {
    return this.props.date;
  }

  public set time(time: string) {
    this.props.time = time;
  }

  public get time(): string {
    return this.props.time;
  }

  public set distance(distance: number) {
    this.props.distance = distance;
  }

  public get distance(): number {
    return this.props.distance;
  }

  public set duration(duration: number) {
    this.props.duration = duration;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public set cost(cost: number) {
    this.props.cost = cost;
  }

  public get cost(): number {
    return this.props.cost;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get status(): string {
    return this.props.status;
  }

  public set seats(seats: number) {
    this.props.seats = seats;
  }

  public get seats(): number {
    return this.props.seats;
  }

  public set carInfoId(carInfoId: number) {
    this.props.carInfoId = carInfoId;
  }

  public get carInfoId(): number {
    return this.props.carInfoId;
  }

  public set driverId(driverId: string) {
    this.props.driverId = driverId;
  }

  public get driverId(): string {
    return this.props.driverId;
  }

  public set passengers(passengers: string[]) {
    this.props.passengers = passengers;
  }

  public get passengers(): string[] {
    return this.props.passengers;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set tripType(tripType: string) {
    this.props.tripType = tripType;
  }

  public get tripType(): string {
    return this.props.tripType;
  }
}
