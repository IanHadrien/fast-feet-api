import { Either, left, right } from "src/core/either"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"
import { UserRepository } from "../repositories/user-repository"
import { RecipientRepository } from "../repositories/recipient-repository"

interface CreateOrderUseCaseRequest {
  status: string
  deliveryDate?: Date
  returnDate?: Date
  userId: string
  recipientId: string
}

type CreateOrderUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async create({
    status,
    deliveryDate,
    returnDate,
    recipientId,
    userId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      return left(new UserAlreadyExistsError('User already not exists'))
    }

    const recipientExists = await this.recipientRepository.findById(recipientId)

    if (!recipientExists) {
      return left(new UserAlreadyExistsError('Recipient already not exists'))
    }

    const order = Order.create({
      status,
      createdAt: new Date(),
      deliveryDate,
      returnDate,
      recipientId: new UniqueEntityID(recipientId),
      userId: new UniqueEntityID(userId),
    })

    await this.orderRepository.create(order)

    return right({
      order
    })
  }
}