import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Toto } from './enums/toto';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => Int)
  @Column()
  exampleField: number;

  @Column()
  toto: Toto;
}
