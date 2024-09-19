import { Either, right } from "src/core/either"
import { User } from "../../enterprise/user"
import { UserRepository } from "../repositories/user-repository"
import { Injectable } from "@nestjs/common"

type GetUserUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetUserUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return right({
      users
    })
  }
}