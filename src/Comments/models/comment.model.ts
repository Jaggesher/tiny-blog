import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/Posts/models/post.model';
import { User } from 'src/users/models/user.model';
@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  creationDate: Date;

  //Related Post
  @Field({ nullable: false })
  postId: string;

  @Field((type) => Post, { nullable: true })
  post: Post;

  //Related User
  @Field({ nullable: false })
  userId: string;

  @Field((type) => User, { nullable: true })
  user: User;
}
