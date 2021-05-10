import { Module } from '@nestjs/common';
import { DBModule } from 'src/database/db.module';
import { HelperModule } from 'src/helper/helper.module';
import { UsersModule } from 'src/users/users.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule, DBModule, HelperModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
