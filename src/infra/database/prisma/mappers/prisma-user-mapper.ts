import { Prisma, User as PrismaUser } from '@prisma/client'
import { User } from "@/domain/fastfeet/enterprise/user"
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        userId: raw.id,
        name: raw.name,
        cpf: raw.cpf,
        currentLocation: raw.currentLocation ?? null,
        password: raw.password,
        role: raw.role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(), // Certifique-se de que o ID está sendo convertido para string
      name: user.name,
      cpf: user.cpf,
      currentLocation: user.currentLocation,
      password: user.password,
      role: user.role,
    }
  }
}
