import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { OAuthProvider } from './enums/oauth-provider';
import { UserRole } from './enums/user-role';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Column()
  roles: UserRole[];

  @Column()
  oauthProvider: OAuthProvider;

  @Column()
  oauthId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  picture?: string;
}
