import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { Comment } from './models/comment.model';
import { NewCommentInput } from './dtos/new-comment.input';
import { Inject, NotFoundException } from '@nestjs/common';
import { Post } from 'src/posts/models/post.model';
import { User } from 'src/users/models/user.model';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from './comments.service';
import { PubSub } from 'apollo-server-express';

@Resolver((of) => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postService: PostsService,
    private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  /**
   * Get comments of a post
   * @param id
   * @returns Comment array
   */
  @Query((returns) => [Comment], { nullable: true, name: 'commentsByPostId' })
  async GetCommentsByPostId(@Args('id') id: string): Promise<Comment[]> {
    return await this.commentsService.GetAllCommentsByPostId(id);
  }

  /**
   * Get comment by Id
   * @param id
   * @returns comment
   */
  @Query((returns) => Comment, { nullable: true, name: 'comment' })
  async GetCommentById(@Args('id') id: string): Promise<Comment> {
    let tm = await this.commentsService.GetComment(id);
    if (!tm) throw new NotFoundException(id);
    return tm;
  }

  /**
   * Resolve Post of comment
   * @param comment
   * @returns
   */
  @ResolveField()
  async post(@Parent() comment: Comment): Promise<Post> {
    return this.postService.findOneById(comment.postId);
  }

  /**
   * Resolve user of comment
   * @param comment
   * @returns user object
   */
  @ResolveField()
  async user(@Parent() comment: Comment): Promise<User> {
    return this.userService.findOneById(comment.userId);
  }

  /**
   * Get subscribe for new comments..
   * @param postId
   * @returns
   */
  @Subscription((returns) => Comment, {
    name: 'commentAdded',
    filter: (payload, variables) =>
      payload.commentAdded.postId === variables.postId,
  })
  async CommentAdded(@Args('postId') postId: string) {
    return this.pubSub.asyncIterator('commentAdded');
  }

  /**
   * Create new comment of a post
   * @param newCommentInput
   * @returns newly created Input
   */
  @Mutation((returns) => Comment, { name: 'createComment' })
  async NewComment(
    @Args('newCommentInput') newCommentInput: NewCommentInput,
  ): Promise<Comment> {
    let tm = await this.commentsService.NewComment(newCommentInput);
    if (!tm) throw new NotFoundException('Invalid, post or user id');

    this.pubSub.publish('commentAdded', { commentAdded: tm }); //Notify the users

    return tm;
  }
}
