import { Either, left, right } from "src/core/either"
import { User } from "../../enterprise/entities/user"
import { UserRepository } from "../repositories/user-repository"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { HashGenerator } from "../cryptography/hash-generator"

interface CreateUserUseCaseRequest {
  name: string
  cpf: string
  password: string
  currentLocation?: string
  role: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async create({
    cpf,
    name,
    currentLocation,
    password,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByCpf(cpf)

    if (userExists) {
      return left(new UserAlreadyExistsError('User already exists'))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      userId: new UniqueEntityID().toString(),
      cpf,
      name,
      currentLocation,
      password: hashedPassword,
      role,
    })

    await this.userRepository.create(user)

    return right({
      user
    })
  }
}