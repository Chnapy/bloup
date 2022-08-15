import { Field, InputType, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput
  implements Partial<Pick<CreateUserInput, 'name' | 'picture'>>
{
  @Field(() => Int)
  id: User['id'];

  name: string;
  picture?: string | undefined;
}
