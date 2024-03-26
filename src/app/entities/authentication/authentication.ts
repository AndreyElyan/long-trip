import { randomUUID } from 'crypto';
import { UserPassword } from '../users/user-information/user-password';

export interface AuthenticationProps {
  email: string;
  password: UserPassword;
}

export class Authentication implements AuthenticationProps {
  private props: AuthenticationProps;

  private _id: string;

  constructor(props: AuthenticationProps) {
    this._id = randomUUID();

    this.props = {
      ...props,
    };
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: UserPassword) {
    this.props.password = password;
  }

  public get password(): UserPassword {
    return this.props.password;
  }
}
