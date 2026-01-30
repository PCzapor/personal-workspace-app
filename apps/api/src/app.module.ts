import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { InfrastructureModule } from './modules/auth/infrastructure/infrastructure.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LinksModule } from './modules/links/links.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 5 }] }),
    InfrastructureModule,
    AuthModule,
    NotesModule,
    LinksModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
