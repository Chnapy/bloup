import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../config/data.module';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext<GraphQLContext>().req;

    if (!user) {
      throw new UnauthorizedException('req.user not defined');
    }

    return user;
  }
);
