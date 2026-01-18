import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { InfrastructureModule } from './modules/auth/infrastructure/infrastructure.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [InfrastructureModule, AuthModule, NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
