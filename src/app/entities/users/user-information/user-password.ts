export class UserPassword {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  constructor(password: string) {
    const isPasswordValid = this.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error('Password Length error');
    }

    this.password = password;
  }
}
