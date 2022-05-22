import { User } from '../../users/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => ID)
  public id: string;

  public accessToken: string;

  public user: User;

  constructor(id: string, accessToken: string, user: User) {
    this.id = id;
    this.accessToken = accessToken;
    this.user = user;
  }
}
