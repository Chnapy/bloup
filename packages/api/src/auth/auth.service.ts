import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { OAuthProvider } from '../users/entities/enums/oauth-provider';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client;

  constructor(private usersService: UsersService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);
  }

  verifyFromToken = async (token: string | undefined) => {
    if (!token) {
      throw new UnauthorizedException('Header authorization not defined');
    }

    const ticket = await this.client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();
    const oauthId = ticket.getUserId();

    if (!payload || !oauthId) {
      throw new TypeError('No payload');
    }

    const user =
      (await this.usersService.findOneBy({
        oauthProvider: OAuthProvider.GOOGLE,
        oauthId,
      })) ??
      (await this.usersService.create({
        oauthProvider: OAuthProvider.GOOGLE,
        oauthId,
        email: payload.email!,
        name: payload.given_name ?? payload.name!,
        picture: payload.picture,
      }));

    // console.log('PAYLOAD', payload, ticket.getAttributes(), ticket.getUserId());
    return user;
  };
}
