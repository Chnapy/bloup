import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../config/data.module';
import { authGuardGoogle } from './google.strategy';

@Injectable()
export class GqlAuthGuard extends authGuardGoogle {
  getResponse(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GraphQLContext>().res;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GraphQLContext>().req;
  }
}
