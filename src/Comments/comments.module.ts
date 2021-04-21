import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { PubSub } from 'apollo-server-express';

@Module({
  imports: [UsersModule, PostsModule],
  providers: [CommentsService, CommentsResolver, {provide: "PUB_SUB", useValue: new PubSub()}],
  exports: [CommentsService],
})
export class CommentsModules {}
