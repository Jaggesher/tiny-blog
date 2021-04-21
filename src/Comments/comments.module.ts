import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [UsersModule, PostsModule],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
})
export class CommentsModules {}
