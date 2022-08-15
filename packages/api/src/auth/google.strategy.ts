import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import joi from 'joi';
import { IncomingMessage } from 'node:http';
import { Strategy as CustomStrategy, VerifiedCallback } from 'passport-custom';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

export type RequestWithUser = IncomingMessage & {
  user?: User;
};

export const strategyName = 'google';

export const authGuardGoogle = AuthGuard(strategyName);

export const requiredEnvsSchema = joi.object({
  GOOGLE_CLIENT_ID: joi.string().required(),
  // GOOGLE_SECRET: joi.string().required(),
});

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  CustomStrategy,
  strategyName
) {
  constructor(private authService: AuthService) {
    super((req: IncomingMessage, done: VerifiedCallback) =>
      this.verify(req, done)
    );
  }

  private verify = async (req: IncomingMessage, done: VerifiedCallback) => {
    try {
      const user = await this.authService.verifyFromToken(
        req.headers.authorization
      );
      done(undefined, user);
    } catch (error) {
      done(new UnauthorizedException(error));
    }
  };
}
