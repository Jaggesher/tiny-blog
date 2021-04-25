import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { NewCommentInput } from './dtos/new-comment.input';
import { Comment } from './models/comment.model';
import { v4 as uuidv4 } from 'uuid';
import { SqliteService } from 'src/database/sqlite/sqlite.service';
import { HelperService } from 'src/helper/helper.service';
import { NotFoundException } from '@nestjs/common';

import { insert, selectById, selectByPostId } from './comments.query';

@Injectable()
export class CommentsService {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
    private readonly sqliteService: SqliteService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Retrieve comments of a post
   * @param id
   * @returns array of Comments
   */
  async GetAllCommentsByPostId(id: string): Promise<Comment[]> {
    try {
      return <Comment[]>await this.sqliteService.all(selectByPostId, {
        $id: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get Comment ny Id
   * @param id
   * @returns Comment object
   */
  async GetComment(id: string): Promise<Comment> {
    try {
      let comment = <Comment>await this.sqliteService.get(selectById, {
        $id: id,
      });
      if (!comment) throw new NotFoundException(id);
      return comment;
    } catch (err) {
      throw new Error(err);
    }
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
}
