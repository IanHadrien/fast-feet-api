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

  async findManyPendingByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: {
          notIn: ['Entregue', 'Devolvido']
        }
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        user: true,
        recipient: true
      }
    })

    return orders.map(order => PrismaOrderMapper.toDomain(order))
  }

  async findManyCompletedByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: {
          in: ['Entregue', 'Devolvido']
        }
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        user: true,
        recipient: true
      }
    })

    return orders.map(order => PrismaOrderMapper.toDomain(order))
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

  async markWithWaiting(id: string): Promise<void> {
    const data = await this.prisma.order.findUnique({
      where: { id },
    })

    await this.prisma.order.update({
      where: { id },
      data: {
        ...data,
        status: 'Aguardando'
      }
    })
  }

  async markWithPickUp(id: string): Promise<void> {
    const data = await this.prisma.order.findUnique({
      where: { id },
    })

    await this.prisma.order.update({
      where: { id },
      data: {
        ...data,
        status: 'Retirada'
      }
    })
  }

  async markWithDeliver(id: string): Promise<void> {
    const data = await this.prisma.order.findUnique({
      where: { id },
    })

    await this.prisma.order.update({
      where: { id },
      data: {
        ...data,
        status: 'Entregue'
      }
    })
  }

  async markWithReturned(id: string): Promise<void> {
    const data = await this.prisma.order.findUnique({
      where: { id },
    })

    await this.prisma.order.update({
      where: { id },
      data: {
        ...data,
        status: 'Devolvida'
      }
    })
  }
}