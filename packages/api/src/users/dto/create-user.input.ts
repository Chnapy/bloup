import { InputType } from '@nestjs/graphql';
import { OAuthProvider } from '../entities/enums/oauth-provider';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput implements Omit<User, 'id'> {
  oauthProvider: OAuthProvider;
  oauthId: string;
  email: string;
  name: string;
  picture?: string;
}
