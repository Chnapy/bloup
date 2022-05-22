import { Injectable } from '@nestjs/common';
import { OAuthProvider } from '../users/entities/enums/oauth-provider';
import { UsersService } from '../users/users.service';
import { Auth } from './entities/auth.entity';
import { ExpressRequest, GoogleStrategy, GoogleUser } from './google.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly googleStrategy: GoogleStrategy
  ) {}

  async authByGoogle(request: ExpressRequest, code: string): Promise<Auth> {
    request.query = {
      code,
    };

    const googleUser = await new Promise<GoogleUser>((resolve, reject) => {
      this.googleStrategy.error = (e: unknown) => {
        reject(e);
      };

      this.googleStrategy.success = (user_: GoogleUser, info?: unknown) => {
        resolve(user_);
      };

      this.googleStrategy.authenticate(request);
    });

    console.log('user', googleUser);

    const getUser = async () => {
      const user = await this.usersService.findOneBy({
        email: googleUser.email,
      });
      if (user) {
        return user;
      }

      return await this.usersService.create({
        oauthProvider: OAuthProvider.GOOGLE,
        oauthId: googleUser.id,
        email: googleUser.email,
        name: googleUser.givenName ?? googleUser.displayName,
        picture: googleUser.picture,
      });
    };

    return new Auth(
      googleUser.accessToken,
      googleUser.accessToken,
      await getUser()
    );
  }

  // googleLogin(req: GraphQLContext['req']) {
  //   console.log('user', req.user);
  //   if (!req.user) {
  //     return 'No user from google';
  //   }

  //   return {
  //     message: 'User information from google',
  //     user: req.user,
  //   };
  // }

  // async validateUser(
  //   username: string,
  //   pass: string
  // ): Promise<User | undefined> {
  //   // const user = await this.usersService.findOne(username);

  //   // if (user && user.password === pass) {
  //   //   const { password, ...result } = user;
  //   //   return result;
  //   // }

  //   return undefined;
  // }
}
