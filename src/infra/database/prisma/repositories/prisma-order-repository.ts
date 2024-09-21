import { PrismaService } from "../prisma.service";
import { DomainEvents } from "@/core/events/domain-events";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "@/domain/fastfeet/application/repositories/order-repository";
import { Order } from "@/domain/fastfeet/enterprise/entities/order";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return null
    }


    return PrismaOrderMapper.toDomain(order)
  }

  async findMany(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        user: true,
        recipient: true
      }
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.create({
      data,
    });

    DomainEvents.dispatchEventsForAggregate(order.id);
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.update({
      where: {
        id: order.id.toString(),
      },
      data
    })
  }

  async delete(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.delete({
      where: {
        id: data.id
      }
    })
  }
}