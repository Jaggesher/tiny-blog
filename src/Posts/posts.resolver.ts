import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { NewPostInput } from './dtos/new-post.input';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
import { PostsService } from './posts.service';
@Resolver((of) => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Get all posts
   * @returns
   */
  @Query((returns) => [Post], { nullable: true, name: 'posts' })
  async getAllPosts(): Promise<Post[]> {
    return await this.postsService.getAll();
  }

  /**
   * Get single post by Id
   * @param id
   * @returns
   */
  @Query((returns) => Post, { name: 'post' })
  async getPost(@Args('id') id: string): Promise<Post> {
    let post: Post = await this.postsService.findOneById(id);
    if (!post) throw new NotFoundException(id);
    return post;
  }

  /**
   * Create new Post
   * @param newPostData
   * @returns
   */
  @Mutation((returns) => Post, { name: 'createPost' })
  async createPost(
    @Args('newPostData') newPostData: NewPostInput,
  ): Promise<Post> {
    let post = await this.postsService.create(newPostData);
    if (!post) throw new NotFoundException('User Not Found');
    return post;
  }

  /**
   * Resolve User Field of post
   * @param post
   * @returns
   */
  @ResolveField()
  async user(@Parent() post: Post): Promise<User> {
    return await this.userService.findOneById(post.userId);
  }
}
