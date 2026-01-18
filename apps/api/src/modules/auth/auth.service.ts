import { AuthErrorCode } from './misc/auth.errors';
import { PasswordService } from './infrastructure/hashing/password.service';
import { SessionService } from './infrastructure/sessions/session.service';
import { TokenService } from './infrastructure/tokens/token.service';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly password: PasswordService,
    private readonly session: SessionService,
    private readonly tokens: TokenService,
  ) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, displayName: true },
    });
    if (!user) throw new UnauthorizedException(AuthErrorCode.USER_NOT_FOUND);
    return user;
  }

  async register(
    email: string,
    password: string,
    meta?: { ip?: string; userAgent?: string },
  ) {
    const existing = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException(AuthErrorCode.EMAIL_ALREADY_EXISTS);
    }

    const passwordHash = await this.password.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
      },
    });

    const session = await this.session.createSession({
      userId: user.id,
      ...meta,
    });

    const accessToken = this.tokens.signAccessToken({
      sub: user.id,
      sid: session.sessionId,
    });

    return { accessToken, user, refreshToken: session.refreshToken };
  }

  async login(
    email: string,
    password: string,
    rememberMe: boolean,
    meta?: { ip?: string; userAgent?: string },
  ) {
    const refreshTtlMs = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000;

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, displayName: true, passwordHash: true },
    });

    if (!user)
      throw new UnauthorizedException(AuthErrorCode.INVALID_CREDENTIALS);

    const isValidPassword = await this.password.verifyPassword(
      user.passwordHash,
      password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException(AuthErrorCode.INVALID_CREDENTIALS);

    const session = await this.session.createSession({
      userId: user.id,
      ...meta,
      refreshTtlMs,
    });

    const accessToken = this.tokens.signAccessToken({
      sub: user.id,
      sid: session.sessionId,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
      accessToken,
      refreshToken: session.refreshToken,
      refreshMaxAge: session.refreshExpiresAt,
    };
  }

  async refreshToken(presentedRefreshToken: string) {
    const rotated = await this.session.rotateRefreshToken(
      presentedRefreshToken,
    );

    const accessToken = this.tokens.signAccessToken({
      sub: rotated.userId,
      sid: rotated.sessionId,
    });

    const user = await this.prisma.user.findUnique({
      where: { id: rotated.userId },
      select: { id: true, email: true, displayName: true },
    });
    if (!user) throw new UnauthorizedException(AuthErrorCode.USER_NOT_FOUND);

    return {
      user,
      accessToken,
      refreshToken: rotated.refreshToken,
      refreshMaxAge: rotated.refreshMaxAge,
    };
  }

  async logout(sessionId: string) {
    await this.session.revokeSession(sessionId);
  }

  async logoutAll(sessionId: string) {
    await this.session.revokeAllSessionsForUser(sessionId);
  }
}
