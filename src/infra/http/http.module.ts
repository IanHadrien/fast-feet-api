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
import { AuthenticationUserController } from "./controllers/authentication-user.controller";
import { AuthenticationUserUseCase } from "@/domain/fastfeet/application/use-cases/authentication-user";
import { CreateOrderController } from "./controllers/create-order.controller";
import { CreateOrderUseCase } from "@/domain/fastfeet/application/use-cases/create-order";
import { GetOrderController } from "./controllers/ger-order.controller";
import { GetOrderUseCase } from "@/domain/fastfeet/application/use-cases/get-order";
import { EditOrderController } from "./controllers/edit-order.controller";
import { EditOrderUseCase } from "@/domain/fastfeet/application/use-cases/edit-order";
import { DeleteOrderController } from "./controllers/delete-order.controller";
import { DeleteOrderUseCase } from "@/domain/fastfeet/application/use-cases/delete-order";
import { MarkWithWaitingOrderController } from "./controllers/mark-with-waiting-order.controller";
import { MarkWithWaitingOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-waiting-order";
import { MarkWithDeliverOrderController } from "./controllers/mark-with-deliver-order.controller";
import { MarkWithDeliverOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-deliver-order";
import { MarkWithPickUpOrderController } from "./controllers/mark-with-pickup-order.controller";
import { MarkWithReturnedOrderController } from "./controllers/mark-with-returned-order.controller";
import { MarkWithPickUpOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-pickup-order";
import { MarkWithReturnedOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-returned-order";
import { GetOrderPendingUseCase } from "@/domain/fastfeet/application/use-cases/get-order-pending";
import { GetOrderPendingController } from "./controllers/get-order-pending.controller";
import { GetOrderCompletedController } from "./controllers/get-order-completed.controller";
import { GetOrderCompletedUseCase } from "@/domain/fastfeet/application/use-cases/get-order-completed";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticationUserController,
    CreateUserController,
    GetUserController,
    EditUserController,
    DeleteUserController,
    
    CreateRecipientController,
    GetRecipientController,
    EditRecipientController,
    DeleteRecipientController,

    CreateOrderController,
    GetOrderController,
    EditOrderController,
    DeleteOrderController,

    MarkWithWaitingOrderController,
    MarkWithDeliverOrderController,
    MarkWithPickUpOrderController,
    MarkWithReturnedOrderController,
    GetOrderPendingController,
    GetOrderCompletedController,
  ],
  providers: [
    AuthenticationUserUseCase,
    CreateUserUseCase,
    GetUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,

    CreateRecipientUseCase,
    GetRecipientUseCase,
    EditRecipientUseCase,
    DeleteRecipientUseCase,

    CreateOrderUseCase,
    GetOrderUseCase,
    EditOrderUseCase,
    DeleteOrderUseCase,
    
    MarkWithWaitingOrderUseCase,
    MarkWithDeliverOrderUseCase,
    MarkWithPickUpOrderUseCase,
    MarkWithReturnedOrderUseCase,
    GetOrderPendingUseCase,
    GetOrderCompletedUseCase,
  ]
})
export class HttpModule {}