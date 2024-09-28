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
  async findById(id: string): Promise<any | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        recipient: true,
        user: true,
      }
    })

    if (!order) {
      return null
    }

    return order
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
        status: 'Retirada',
        returnDate: new Date()
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
        status: 'Entregue',
        deliveryDate: new Date()
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