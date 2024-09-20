import { Either, left, right } from "src/core/either"
import { UserRepository } from "../repositories/user-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface DeleteUserUseCaseRequest {
  userId: string
}

type DeleteUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}