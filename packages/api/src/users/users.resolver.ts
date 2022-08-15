import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRole } from './entities/enums/user-role';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => ID }) id: User['id']) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  @Roles(UserRole.USER)
  currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
