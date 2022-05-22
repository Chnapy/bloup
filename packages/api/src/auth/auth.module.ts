import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'google',
    }),
  ],
  providers: [AuthResolver, AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
