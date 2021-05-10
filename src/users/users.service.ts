import { Injectable, NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dtos/new-user.input';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { SqliteService } from 'src/database/sqlite/sqlite.service';
import { HelperService } from 'src/helper/helper.service';
import { insert, select, selectById } from './users.query';
@Injectable()
export class UsersService {
  constructor(
    private readonly sqliteService: SqliteService,
    private readonly helperService: HelperService,
  ) {}
  /**
   * Get One user by ID.
   * @param id
   * @returns User
   */
  async findOneById(id: string): Promise<User> {
    try {
      let user = <User>await this.sqliteService.get(selectById, {
        $id: id,
      });
      //if (!user) throw new NotFoundException(id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * For getting all Users
   * @returns Users Array
   */
  async findAll(): Promise<User[]> {
    try {
      let tm = <User[]>await this.sqliteService.all(select);
      return tm;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Add new user.
   * @param newUser
   * @returns newly created user
   */
  async create(newUser: NewUserInput): Promise<User> {
    let tm = new User();
    tm.id = uuidv4();
    tm.name = newUser.name;
    tm.email = newUser.email;
    tm.creationDate = new Date();

    try {
      let flag = await this.sqliteService.run(
        insert,
        this.helperService.objTo$obj(tm),
      );
      if (flag) return tm;
      throw new Error('Something went wrong!');
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Check weather user exists or not by Id.
   * @param id
   * @returns true of false
   */
  async CheckUserById(id: string): Promise<boolean> {
    try {
      let tm = <User>await this.sqliteService.get(selectById, {
        $id: id,
      });
      return tm ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }
}
