import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateUserController } from "./controllers/create-user.controller";
import { CreateUserUseCase } from "@/domain/fastfeet/application/use-cases/create-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetUserController } from "./controllers/ger-user.controller";
import { GetUserUseCase } from "@/domain/fastfeet/application/use-cases/get-user";
import { EditUserController } from "./controllers/edit-user.controller";
import { EditUserUseCase } from "@/domain/fastfeet/application/use-cases/edit-user";
import { DeleteUserController } from "./controllers/delete-user.controller";
import { DeleteUserUseCase } from "@/domain/fastfeet/application/use-cases/delete-user";
import { CreateRecipientController } from "./controllers/create-recipient.controller";
import { CreateRecipientUseCase } from "@/domain/fastfeet/application/use-cases/create-recipient";
import { EditRecipientController } from "./controllers/edit-recipient.controller";
import { EditRecipientUseCase } from "@/domain/fastfeet/application/use-cases/edit-recipient";
import { GetRecipientController } from "./controllers/ger-recipient.controller";
import { GetRecipientUseCase } from "@/domain/fastfeet/application/use-cases/get-recipient";
import { DeleteRecipientController } from "./controllers/delete-recipient.controller";
import { DeleteRecipientUseCase } from "@/domain/fastfeet/application/use-cases/delete-recipient";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    GetUserController,
    EditUserController,
    DeleteUserController,
    
    CreateRecipientController,
    GetRecipientController,
    EditRecipientController,
    DeleteRecipientController,
  ],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,

    CreateRecipientUseCase,
    GetRecipientUseCase,
    EditRecipientUseCase,
    DeleteRecipientUseCase,
  ]
})
export class HttpModule {}