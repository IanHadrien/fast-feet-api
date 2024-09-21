import { Either, left, right } from "src/core/either"
import { UserRepository } from "../repositories/user-repository"
import { Injectable } from "@nestjs/common"
import { WrongCredentialsError } from "./errors/wrong-credentials-error"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"

interface AuthenticationUserUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticationUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticationUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticationUserUseCaseRequest): Promise<AuthenticationUserUseCaseResponse> {
    const user = await this.userRepository.findByCpf(cpf)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}