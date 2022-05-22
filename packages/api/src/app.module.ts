import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';
import { DataModule } from './config/data.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';

@Module({
  imports: [ConfigModule, DataModule, UsersModule, AuthModule],
  providers: [GoogleStrategy],
})
export class AppModule {}
