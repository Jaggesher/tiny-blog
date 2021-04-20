import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
@ObjectType()
export class Post {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  creationDate: Date;

  @Field((type) => User, { nullable: true })
  user: User;
}
