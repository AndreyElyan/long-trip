import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { UserPassword } from './user-password';

export interface UserInformationProps {
  name: string;
  lastName: string;
  imageUrl: string;
  password: UserPassword;
  dateOfBirth: string;
  gender: string;
  cellPhone: string;
  email: string;
  resetToken: number;
  resetTokenExpiry: Date;
  createdAt: Date;
  updateAt: Date;
}

export class UserInformation {
  private props: UserInformationProps;

  private _id: string;

  constructor(
    props: Replace<
    UserInformationProps,
    {
      createdAt?: Date;
      updateAt?: Date;
      resetToken?: number;
      resetTokenExpiry?: Date;
    }
    >,
  ) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updateAt: props.updateAt ?? new Date(),
      resetToken: props.resetToken ?? 0,
      resetTokenExpiry: props.resetTokenExpiry ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public set password(password: UserPassword) {
    this.props.password = password;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }

  public set dateOfBirth(dateOfBirth: string) {
    this.props.dateOfBirth = dateOfBirth;
  }

  public get dateOfBirth(): string {
    return this.props.dateOfBirth;
  }

  public set resetToken(resetToken: number) {
    this.props.resetToken = resetToken;
  }

  public get resetToken(): number {
    return this.props.resetToken;
  }

  public set resetTokenExpiry(resetTokenExpiry: Date) {
    this.props.resetTokenExpiry = resetTokenExpiry;
  }

  public get resetTokenExpiry(): Date {
    return this.props.resetTokenExpiry;
  }

  public set gender(gender: string) {
    this.props.gender = gender;
  }

  public get gender(): string {
    return this.props.gender;
  }

  public set cellPhone(cellPhone: string) {
    this.props.cellPhone = cellPhone;
  }

  public get cellPhone(): string {
    return this.props.cellPhone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set updateAt(updateAt: Date) {
    this.props.updateAt = updateAt;
  }

  public get updateAt(): Date {
    return this.props.updateAt;
  }
}
