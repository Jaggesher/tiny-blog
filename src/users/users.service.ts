import { Injectable, NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dtos/new-user.input';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private myUsers: User[];
  constructor() {
    this.myUsers = [];
  }
  /**
   * Get One user by ID.
   * @param id
   * @returns User
   */
  async findOneById(id: string): Promise<User> {
    let user = this.myUsers.find((x) => x.id === id);
    if(!user) throw new NotFoundException(id);
    return user;
  }

  /**
   * For getting all Users
   * @returns Users Array
   */
  async findAll(): Promise<User[]> {
    return this.myUsers;
  }

  async create(newUser: NewUserInput): Promise<User> {
    let tm = new User();
    tm.id = uuidv4();
    tm.name = newUser.name;
    tm.email = newUser.email;
    tm.creationDate = new Date();
    this.myUsers.push(tm);
    return tm;
  }
}
