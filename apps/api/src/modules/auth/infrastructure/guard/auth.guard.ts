import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthErrorCode } from '../../misc/auth.errors';
import { AuthRequestUser } from '../../misc/auth.types';

import { TokenService } from '../tokens/token.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly tokens: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.cookies?.pw_access as string;
    if (!token)
      throw new UnauthorizedException(AuthErrorCode.MISSING_ACCESS_TOKEN);

    try {
      const payload = this.tokens.verifyAccessToken(token);
      req.auth = {
        userId: payload.sub,
        sessionId: payload.sid,
      } satisfies AuthRequestUser;
      return true;
    } catch {
      throw new UnauthorizedException(AuthErrorCode.INVALID_ACCESS_TOKEN);
    }
  }
}
