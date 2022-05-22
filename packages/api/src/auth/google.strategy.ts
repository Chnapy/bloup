import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';

export type ExpressRequest = Parameters<Strategy['authenticate']>[0];

const strategyName = 'google';

export const authGuardGoogle = AuthGuard(strategyName);

// const createStore = (): StrategyOptions['store'] => ({
//   store: (req, callback) => {
//     console.log('STORE');
//     typeof callback === 'function' && callback(null, null);
//   },
//   verify: (req, state, callback) => {
//     const ret =
//       typeof callback === 'function' && callback(null as any, true, state);
//     console.log('VERIFY', ret);
//   },
// });

export type GoogleUser = {
  id: string;
  email: string;
  displayName: string;
  givenName?: string;
  picture?: string;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, strategyName) {
  constructor() {
    const strategyOptions: StrategyOptions = {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      scope: ['openid', 'email', 'profile'],
      callbackURL: 'http://localhost:3000/api/oauth/google/redirect',
    };
    super(strategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    console.log('P', profile, accessToken, refreshToken);
    const { id, displayName, name, emails = [], photos } = profile;

    const googleUser: GoogleUser = {
      id,
      email: emails[0].value,
      displayName,
      givenName: name?.givenName,
      picture: photos?.[0].value,
      accessToken,
      refreshToken,
    };

    return done(undefined, googleUser);
  }

  // error(e: Error) {
  //   console.error('ERROR', e);
  //   this.lastError = e;
  // }

  // setOnError = (onError: (e: Error) => void) => {
  //   this.error = onError;
  // };

  // authenticate(req: any, options?: any): Promise<any> {
  //   // super.authenticate.apply(this, [req, options]);
  //   // super.authenticate.call(this, req, options);
  //   // this.lastError = null;

  //   return new Promise((resolve, reject) => {
  //     super.authenticate.call(
  //       {
  //         ...this,
  //         error: (e: any) => {
  //           console.log('FOO');
  //           reject(e);
  //         },
  //       },
  //       req,
  //       options
  //     );
  //   });
  //   // super.authenticate(req, options);

  //   // const error = this.lastError;
  //   // this.lastError = null;

  //   // return {
  //   //   error,
  //   // };
  // }

  // authenticate(r: any, o: any) {
  //   console.log('auth', r, o, r.user);
  //   return super.authenticate(r, o);
  // }

  // userProfile(r: any, o: any) {
  //   // console.log('prof', r, o);
  //   return super.userProfile(r, o);
  // }

  //   async validate(username: string, password: string): Promise<any> {
  //     const user = await this.authService.validateUser(username, password);
  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //     return user;
  //   }
}
