import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { RecipientRepository } from "../repositories/recipient-repository"

interface DeleteRecipientUseCaseRequest {
  recipientId: string
}

type DeleteRecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    await this.recipientRepository.delete(recipient)

    return right(null)
  }
}