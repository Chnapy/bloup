import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { GoogleStrategy, strategyName } from './google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: strategyName,
    }),
  ],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
