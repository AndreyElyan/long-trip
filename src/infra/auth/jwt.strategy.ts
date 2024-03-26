import { jwtConstants } from '@app/entities/authentication/constants';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants().secret,
    });
  }

  async validate(sub: string, email: string) {
    return { userId: sub, email };
  }
}
