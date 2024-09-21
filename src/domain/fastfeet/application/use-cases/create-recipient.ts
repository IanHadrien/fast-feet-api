import { Either, left, right } from "src/core/either"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

interface CreateRecipientUseCaseRequest {
  name: string
  address: string
  phone: string
  email: string
}

type CreateRecipientUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class CreateRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
  ) {}

  async create({
    name,
    address,
    email,
    phone,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipientExists = await this.recipientRepository.findByEmail(email)

    if (recipientExists) {
      return left(new UserAlreadyExistsError('Recipient already exists'))
    }

    const recipient = Recipient.create({
      recipientId: new UniqueEntityID().toString(),
      name,
      address,
      email,
      phone,
    })

    await this.recipientRepository.create(recipient)

    return right({
      recipient
    })
  }
}