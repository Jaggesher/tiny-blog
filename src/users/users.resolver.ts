import { UsersService } from './users.service';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './models/user.model';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dtos/new-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get single User by Id
   * @param id
   * @returns single user, or throw not found exception
   */
  @Query((returns) => User, { nullable: true, name: "user" })
  async user(@Args('id') id: string): Promise<User> {
    let user: User = await this.usersService.findOneById(id);
    if (!user) new NotFoundException(id);
    return user;
  }

  /**
   * Get all Users
   * @returns array of User
   */
  @Query((returns) => [User], { nullable: true, name: "users" })
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  /**
   * Save new user
   * @param newUserData
   * @returns newly saved user or throw exception
   */
  @Mutation((returns) => User,{ name: "createUser"})
  async createUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    return await this.usersService.create(newUserData);
  }
}
