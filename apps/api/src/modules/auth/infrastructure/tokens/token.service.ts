import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type AccessTokenPayload = {
  sub: string; //userID
  sid: string; //sessionID
};

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return this.jwt.sign(payload);
  }

  verifyAccessToken(payload: string): AccessTokenPayload {
    return this.jwt.verify(payload);
  }
}
