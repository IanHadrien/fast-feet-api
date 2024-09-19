import { User } from "../../enterprise/user";

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
  abstract findMany(): Promise<User[]>
  abstract create(user: User): Promise<void>
  abstract save(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}