import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  name?: string;

  @Field()
  @IsEmail()
  email: string;
}
