import { Either, left, right } from "src/core/either"
import { User } from "../../enterprise/user"
import { UserRepository } from "../repositories/user-repository"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { HashGenerator } from "../cryptography/hash-generator"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface EditUserUseCaseRequest {
  id: string
  name: string
  cpf: string
  password: string
  currentLocation?: string
  role: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    id,
    cpf,
    name,
    currentLocation,
    password,
    role,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(id) // Busca pro id

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    // const userCpfExists = await this.userRepository.findByCpf(cpf) // Busca pro id

    // if (userCpfExists) {
    //   return left(new ResourceNotFoundError())
    // }

    const hashedPassword = await this.hashGenerator.hash(password)

    user.name = name
    user.cpf = cpf
    user.currentLocation = user.currentLocation ?? currentLocation
    user.password = hashedPassword
    user.role = role

    await this.userRepository.save(user)

    return right({
      user
    })
  }
}