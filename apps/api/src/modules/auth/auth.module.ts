import { Module } from '@nestjs/common';
import { PasswordService } from './infrastructure/hashing/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TokenService } from './infrastructure/tokens/token.service';
import { SessionService } from './infrastructure/sessions/session.service';
import { AuthService } from './auth.service';
import { AccessGuard } from './infrastructure/guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: Number(cfg.getOrThrow<string>('JWT_ACCESS_TTL_SECONDS')),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PasswordService,
    TokenService,
    SessionService,
    AuthService,
    AccessGuard,
  ],
  exports: [AuthService, TokenService, AccessGuard],
})
export class AuthModule {}
