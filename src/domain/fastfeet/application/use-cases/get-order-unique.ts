import { Either, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"

type GetOrderUniqueUseCaseResponse = Either<
  null,
  {
    order: Order | null
  }
>

@Injectable()
export class GetOrderUniqueUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<GetOrderUniqueUseCaseResponse> {
    const order = await this.orderRepository.findById(id)

    return right({
      order
    })
  }
}