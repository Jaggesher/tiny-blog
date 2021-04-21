import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { NewCommentInput } from './dtos/new-comment.input';
import { Comment } from './models/comment.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  private myComments: Comment[];

  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {
    this.myComments = [];
  }

  /**
   * Retrieve comments of a post
   * @param id
   * @returns array of Comments
   */
  async GetAllCommentsByPostId(id: string): Promise<Comment[]> {
    return this.myComments.filter((x) => {
      return x.postId === id;
    });
  }

  /**
   * Get Comment ny Id
   * @param id
   * @returns Comment object
   */
  async GetComment(id: string): Promise<Comment> {
    return this.myComments.find((x) => x.id === id);
  }

  /**
   * Create new Comment
   * @param data 
   * @returns newly created comment 
   */
  async NewComment(data: NewCommentInput): Promise<Comment> {
    if (!(await this.userService.CheckUserById(data.userId))) return null;
    if (!(await this.postService.CheckPostById(data.postId))) return null;

    let tm = new Comment();
    tm.id = uuidv4();
    tm.text = data.text;
    tm.postId = data.postId;
    tm.userId = data.userId;
    tm.creationDate = new Date();

    this.myComments.push(tm);

    return tm;
  }
}
