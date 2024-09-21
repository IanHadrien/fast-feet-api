import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

interface EditRecipientUseCaseRequest {
  id: string
  name: string
  address: string
  phone: string
  email: string
}

type EditrecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class EditRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    id,
    address,
    email,
    name,
    phone,
  }: EditRecipientUseCaseRequest): Promise<EditrecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(id) 

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.address = address
    recipient.email = email
    recipient.phone = phone

    await this.recipientRepository.save(recipient)

    return right({
      recipient
    })
  }
}