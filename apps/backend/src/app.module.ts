import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [ProfilesModule, UsersModule, ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
