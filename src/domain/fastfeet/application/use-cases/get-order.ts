import { Either, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"

type GetOrderUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

@Injectable()
export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<GetOrderUseCaseResponse> {
    const orders = await this.orderRepository.findMany()

    return right({
      orders
    })
  }
}