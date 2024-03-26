import { Replace } from '@helpers/Replace';

export interface CarsProps {
  userId: string;
  category: string;
  model: string;
  make: string;
  year: string;
  color: string;
  licensePlate: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Cars implements CarsProps {
  private props: Replace<CarsProps, { _id?: string }>;

  private _id: number;

  constructor(props: CarsProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  updatedAt?: Date;

  public get id(): number {
    return this._id;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set model(model: string) {
    this.props.model = model;
  }

  public get model(): string {
    return this.props.model;
  }

  public set make(make: string) {
    this.props.make = make;
  }

  public get make(): string {
    return this.props.make;
  }

  public set year(year: string) {
    this.props.year = year;
  }

  public get year(): string {
    return this.props.year;
  }

  public set color(color: string) {
    this.props.color = color;
  }

  public get color(): string {
    return this.props.color;
  }

  public set licensePlate(licensePlate: string) {
    this.props.licensePlate = licensePlate;
  }

  public get licensePlate(): string {
    return this.props.licensePlate;
  }

  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
