import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@/domain/fastfeet/application/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { RecipientRepository } from "@/domain/fastfeet/application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { OrderRepository } from "@/domain/fastfeet/application/repositories/order-repository";
import { PrismaOrderRepository } from "./prisma/repositories/prisma-order-repository";

@Module({
  // imports: []
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    RecipientRepository,
    OrderRepository,
  ]
})
export class DatabaseModule {}