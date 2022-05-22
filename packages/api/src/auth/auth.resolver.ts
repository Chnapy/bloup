import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../config/data.module';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth)
  async authByGoogle(
    @Args('code') code: string,
    @Context() { req }: GraphQLContext
  ) {
    return await this.authService.authByGoogle(req, code);
  }
}
