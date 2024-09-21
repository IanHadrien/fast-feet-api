import { Prisma, Recipient as PrismaRecipient } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/fastfeet/enterprise/entities/recipient'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        recipientId: raw.id,
        name: raw.name,
        email: raw.email,
        address: raw.address,
        phone: raw.phone,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      email: recipient.email,
      address: recipient.address,
      phone: recipient.phone,
    }
  }
}
