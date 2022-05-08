import { Field, InputType, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  exampleField: User['exampleField'];

  toto: User['toto'];
}
