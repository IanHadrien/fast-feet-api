import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { RecipientRepository } from "../repositories/recipient-repository"
import { UserRepository } from "../repositories/user-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface EditOrderUseCaseRequest {
  id: string
  status: string
  deliveryDate?: Date
  returnDate?: Date
  userId: string
  recipientId: string
}

type EditrecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

@Injectable()
export class EditOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    id,
    recipientId,
    userId,
    deliveryDate,
    returnDate,
    status,
  }: EditOrderUseCaseRequest): Promise<EditrecipientUseCaseResponse> {
    const order = await this.orderRepository.findById(id) 

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      return left(new UserAlreadyExistsError('User already not exists'))
    }

    const recipientExists = await this.recipientRepository.findById(recipientId)

    if (!recipientExists) {
      return left(new UserAlreadyExistsError('Recipient already not exists'))
    }

    order.status = status
    order.userId = new UniqueEntityID(userId).toString()
    order.recipientId = new UniqueEntityID(recipientId).toString()
    order.deliveryDate = deliveryDate
    order.returnDate = returnDate

    await this.orderRepository.save(order)

    return right({
      order
    })
  }
}