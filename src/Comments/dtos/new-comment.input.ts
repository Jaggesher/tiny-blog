import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class NewCommentInput {
  @Field()
  @Length(3, 200)
  text: string;

  @Field()
  @IsUUID()
  postId: string;

  @Field()
  @IsUUID()
  userId: string;
}
