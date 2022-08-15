import { ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../config/data.module';
import { UserRole } from '../users/entities/enums/user-role';
import { authGuardGoogle } from './google.strategy';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard extends authGuardGoogle {
  constructor(
    private reflector: Reflector
  ) {
    super()
  }

  getResponse(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GraphQLContext>().res;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GraphQLContext>().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if(!canActivate) {
      return canActivate;
    }

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if(requiredRoles.length === 0) {
      throw new InternalServerErrorException('At least one role must be specified using @Roles() decorator.');
    }

    const {user} = this.getRequest(context);
    const userRoles = user?.roles ?? [];
    
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
