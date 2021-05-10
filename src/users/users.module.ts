import { Module } from "@nestjs/common";
import { DBModule } from "src/database/db.module";
import { HelperModule } from "src/helper/helper.module";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports:[DBModule, HelperModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})

export class UsersModule{}