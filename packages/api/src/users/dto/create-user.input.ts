import { InputType } from '@nestjs/graphql';
import { OAuthProvider } from '../entities/enums/oauth-provider';
import { UserRole } from '../entities/enums/user-role';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput implements Omit<User, 'id'> {
  roles: UserRole[];
  oauthProvider: OAuthProvider;
  oauthId: string;
  email: string;
  name: string;
  picture?: string;
}
