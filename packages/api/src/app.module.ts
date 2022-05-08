import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';
import { DataModule } from './config/data.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, DataModule, UsersModule],
})
export class AppModule {}
