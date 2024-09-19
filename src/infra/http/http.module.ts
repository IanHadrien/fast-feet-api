import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateUserController } from "./controllers/create-user.controller";
import { CreateUserUseCase } from "@/domain/fastfeet/application/use-cases/create-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetUserController } from "./controllers/ger-user.controller";
import { GetUserUseCase } from "@/domain/fastfeet/application/use-cases/get-user";
import { EditUserController } from "./controllers/edit-user.controller";
import { EditUserUseCase } from "@/domain/fastfeet/application/use-cases/edit-user";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    GetUserController,
    EditUserController,
  ],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    EditUserUseCase
  ]
})
export class HttpModule {}