import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field()
  @Length(6, 100)
  title: string;

  @Field()
  @Length(6, 200)
  description: string;

  @Field()
  @IsUUID()
  userId: string;
}
