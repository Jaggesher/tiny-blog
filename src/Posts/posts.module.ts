import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
    imports:[UsersModule],
    providers: [PostsService, PostsResolver]
})
export class PostsModule {}
