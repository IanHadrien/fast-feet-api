import { Either, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { OrderRepository } from "../repositories/order-repository"

type GetOrderPendingUseCaseResponse = Either<
  null,
  {
    orders: {
      id: string;
      status: string;
      createdAt: Date;
      deliveryDate: Date | null;
      returnDate: Date | null;
      userId: string;
      recipientId: string;
    }[];
  }
>

@Injectable()
export class GetOrderPendingUseCase {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: string): Promise<GetOrderPendingUseCaseResponse> {
    const orders = await this.orderRepository.findManyPendingByUserId(id) 

    const formattedOrders = orders.map(order => ({
      id: order.id.toString(),
      status: order.status,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,
      returnDate: order.returnDate,
      userId: order.userId.toString(),
      recipientId: order.recipientId.toString(),
    }));

    return right({
      orders: formattedOrders
    });
  }
}