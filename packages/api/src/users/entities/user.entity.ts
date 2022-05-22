import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { OAuthProvider } from './enums/oauth-provider';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

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
