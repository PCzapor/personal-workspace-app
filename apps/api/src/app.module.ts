import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { InfrastructureModule } from './modules/auth/infrastructure/infrastructure.module';
import { NotesModule } from './modules/notes/notes.module';
import { LinksModule } from './modules/links/links.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [InfrastructureModule, AuthModule, NotesModule, LinksModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
