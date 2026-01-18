import {
  Post,
  Req,
  Res,
  Body,
  Controller,
  UnauthorizedException,
  UseGuards,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthRequestUser,
  AuthUserResponse,
  LoginRequest,
  RegisterRequest,
} from './misc/auth.types';
import type { Request, Response } from 'express';
import { AccessGuard } from './infrastructure/guard/auth.guard';
import { AuthErrorCode } from './misc/auth.errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthUserResponse> {
    const meta: { ip?: string; userAgent?: string } = {};
    if (req.ip) meta.ip = req.ip;
    if (req.headers['user-agent']) meta.userAgent = req.headers['user-agent'];
    const result = await this.auth.register(body.email, body.password, meta);

    res.cookie('pw_access', result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false, // true for prod
      maxAge: 10 * 60 * 1000,
    });

    res.cookie('pw_refresh', result.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false,
    });

    return result.user;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthUserResponse> {
    const meta: { ip?: string; userAgent?: string } = {};
    const rememberMe = body.rememberMe ?? false;

    if (req.ip) meta.ip = req.ip;
    if (req.headers['user-agent']) meta.userAgent = req.headers['user-agent'];

    const result = await this.auth.login(
      body.email,
      body.password,
      body.rememberMe ?? false,
      meta,
    );
    const refreshMaxAgeMs = Math.max(
      0,
      result.refreshMaxAge.getTime() - Date.now(),
    );

    res.cookie('pw_access', result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false, // true for prod
      maxAge: 10 * 60 * 1000,
    });

    if (rememberMe) {
      res.cookie('pw_refresh', result.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        ...(rememberMe ? { maxAge: refreshMaxAgeMs } : {}),
      });
    }
    return result.user;
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.pw_refresh;
    if (!refreshToken) {
      throw new UnauthorizedException(AuthErrorCode.MISSING_REFRESH_TOKEN);
    }

    const result = await this.auth.refreshToken(refreshToken);
    const refreshMaxAgeMs = Math.max(
      0,
      result.refreshMaxAge.getTime() - Date.now(),
    );

    res.cookie('pw_access', result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    res.cookie('pw_refresh', result.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: refreshMaxAgeMs,
    });

    return result.user;
  }

  @Get('me')
  @UseGuards(AccessGuard)
  async me(@Req() req: Request) {
    const auth = req.auth as AuthRequestUser;
    const user = await this.auth.getMe(auth.userId);
    return user;
  }

  @Post('logout')
  @UseGuards(AccessGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const auth = req.auth as AuthRequestUser;

    await this.auth.logout(auth.sessionId);

    res.clearCookie('pw_access', { path: '/' });
    res.clearCookie('pw_refresh', { path: '/' });

    return { ok: true };
  }
}
