import { Injectable, NotFoundException } from '@nestjs/common';
import { NewPostInput } from './dtos/new-post.input';
import { Post } from './models/post.model';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { SqliteService } from 'src/database/sqlite/sqlite.service';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sqliteService: SqliteService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Get single post by ID
   * @param id post id
   * @returns
   */
  async findOneById(id: string): Promise<Post> {
    try {
      let post = <Post>await this.sqliteService.get(
        `SELECT * FROM Post WHERE id = $id`,
        {
          $id: id,
        },
      );
      if (!post) throw new NotFoundException(id);
      return post;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get all Post
   * @returns
   */
  async getAll(): Promise<Post[]> {
    try {
      let tm = <Post[]>await this.sqliteService.all('SELECT * FROM Post');
      return tm;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**s
   * Create new post
   * @param data
   * @returns newly created post
   */
  async create(data: NewPostInput): Promise<Post> {
    if (!(await this.usersService.CheckUserById(data.userId))) return null;

    let post = new Post();
    post.id = uuidv4();
    post.title = data.title;
    post.description = data.description;
    post.userId = data.userId;
    post.creationDate = new Date();
    
    try {
      let flag = await this.sqliteService.run(
        `INSERT INTO Post (id, title, description, userId, creationDate) VALUES($id, $title, $description, $userId, $creationDate)`,
        this.helperService.objTo$obj(post),
      );
      if (flag) return post;
      throw new Error('Something went wrong!');
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Check weather post id is valid or not
   * @param id
   * @returns true of false
   */
  async CheckPostById(id: string) {
    try {
      let tm = <Post>await this.sqliteService.get(
        `SELECT * FROM Post WHERE id = $id`,
        {
          $id: id,
        },
      );
      return tm ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }
}
