import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const issuer = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL}`;
    const urlToKeys = `${issuer}/.well-known/jwks.json`;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: false,
        rateLimit: true,
        jwksUri: urlToKeys,
      }),
      audience: process.env.CLIENT_ID,
      issuer: issuer,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
