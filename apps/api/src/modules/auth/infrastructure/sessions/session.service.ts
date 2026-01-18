import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/modules/auth/infrastructure/prisma/prisma.service';
import crypto from 'node:crypto';
import { AuthErrorCode } from '../../misc/auth.errors';

export type CreateSessionInput = {
  userId: string;
  ip?: string;
  userAgent?: string;
};

export type SessionIssueResult = {
  sessionId: string;
  refreshToken: string;
  refreshExpiresAt: Date;
};
export type RefreshTokenResult = {
  userId: string;
  sessionId: string;
  refreshToken: string;
  refreshMaxAge: Date;
};

@Injectable()
export class SessionService {
  private readonly refreshTtlMs = 30 * 24 * 60 * 60 * 1000;

  constructor(private readonly prisma: PrismaService) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  async createSession(
    input: CreateSessionInput & { refreshTtlMs?: number },
  ): Promise<SessionIssueResult> {
    const ttl = input.refreshTtlMs ?? this.refreshTtlMs;
    const refreshToken = this.generateRefreshToken();
    const refreshTokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + ttl);

    const session = await this.prisma.session.create({
      data: {
        userId: input.userId,
        refreshTokenHash,
        expiresAt,
        ...(input.ip ? { ip: input.ip } : {}),
        ...(input.userAgent ? { userAgent: input.userAgent } : {}),
      },
      select: { id: true, expiresAt: true },
    });

    return {
      sessionId: session.id,
      refreshToken,
      refreshExpiresAt: session.expiresAt,
    };
  }

  async rotateRefreshToken(
    presentedRefreshToken: string,
  ): Promise<RefreshTokenResult> {
    const presentedHash = this.hashToken(presentedRefreshToken);
    const session = await this.prisma.session.findFirst({
      where: { refreshTokenHash: presentedHash },
      select: {
        id: true,
        refreshTokenHash: true,
        revokedAt: true,
        expiresAt: true,
        userId: true,
      },
    });
    if (!session)
      throw new UnauthorizedException(AuthErrorCode.SESSION_EXPIRED);
    if (session.revokedAt)
      throw new UnauthorizedException(AuthErrorCode.SESSION_REVOKED);
    if (session.expiresAt.getTime() < Date.now())
      throw new UnauthorizedException(AuthErrorCode.SESSION_EXPIRED);

    if (presentedHash !== session.refreshTokenHash) {
      await this.prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException(AuthErrorCode.REFRESH_REUSE_DETECTED);
    }

    const newRefreshToken = this.generateRefreshToken();
    const newHash = this.hashToken(newRefreshToken);

    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: newHash,
        updatedAt: new Date(),
        expiresAt: new Date(Date.now() + this.refreshTtlMs),
      },
    });

    return {
      userId: session.userId,
      sessionId: session.id,
      refreshToken: newRefreshToken,
      refreshMaxAge: session.expiresAt,
    };
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllSessionsForUser(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
