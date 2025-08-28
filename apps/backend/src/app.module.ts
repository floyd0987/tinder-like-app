import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [UsersModule, ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
