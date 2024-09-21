import { left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { OrderRepository } from "../repositories/order-repository"

@Injectable()
export class MarkWithPickUpOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: string) {
    const order = await this.orderRepository.findById(id) 

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    await this.orderRepository.markWithPickUp(id)

    return right(null)
  }
}