import { Injectable, NotFoundException } from '@nestjs/common';
import { NewPostInput } from './dtos/new-post.input';
import { Post } from './models/post.model';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  private myPosts: Post[];

  constructor(private readonly usersService: UsersService) {
    this.myPosts = [];
  }

  /**
   * Get single post by ID
   * @param id post id
   * @returns
   */
  async findOneById(id: string): Promise<Post> {
    return this.myPosts.find((x) => x.id === id);
  }

  /**
   * Get all Post
   * @returns
   */
  async getAll(): Promise<Post[]> {
    return this.myPosts;
  }

  async create(data: NewPostInput): Promise<Post> {
    if (!(await this.usersService.CheckUserById(data.userId))) return null;

    let post = new Post();
    post.id = uuidv4();
    post.title = data.title;
    post.description = data.description;
    post.userId = data.userId;
    post.creationDate = new Date();

    this.myPosts.push(post);
    return post;
  }
}
