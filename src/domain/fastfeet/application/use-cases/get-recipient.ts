import { Either, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

type GetRecipientUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

@Injectable()
export class GetRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute(): Promise<GetRecipientUseCaseResponse> {
    const recipients = await this.recipientRepository.findMany()

    return right({
      recipients
    })
  }
}