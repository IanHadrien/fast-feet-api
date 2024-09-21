import { Prisma, Order as PrismaOrder } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/fastfeet/enterprise/entities/order'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        orderId: raw.id.toString(),
        status: raw.status,
        createdAt: raw.createdAt,
        deliveryDate: raw.deliveryDate ?? null,
        returnDate: raw.returnDate ?? null,
        userId: new UniqueEntityID(raw.userId).toString(),
        recipientId: new UniqueEntityID(raw.recipientId).toString(),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(), // Certifique-se de que o ID está sendo convertido para string
      status: order.status,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,
      returnDate: order.returnDate,
      userId: order.userId.toString(),
      recipientId: order.recipientId.toString(),
    }
  }
}
