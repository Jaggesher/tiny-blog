import { UsersService } from './users.service';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './models/user.model';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dtos/new-user.input';

@Resolver((of) => User)
export class UsersResolver {
  
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User> {
    let user: User = await this.usersService.findOneById(id);
    if (!user) new NotFoundException(id);
    return user;
  }

  @Query((returns) => [User], { nullable: true })
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    return await this.usersService.create(newUserData);
  }
}
