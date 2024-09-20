import { Recipient } from "@/domain/fastfeet/enterprise/recipient";
import { PrismaService } from "../prisma.service";
import { DomainEvents } from "@/core/events/domain-events";
import { Injectable } from "@nestjs/common";
import { RecipientRepository } from "@/domain/fastfeet/application/repositories/recipient-repository";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id },
    })

    if (!recipient) {
      return null
    }


    return PrismaRecipientMapper.toDomain(recipient)
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { email },
    })

    if (!recipient) {
      return null
    }


    return PrismaRecipientMapper.toDomain(recipient)
  }

  async findMany(): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return recipients.map(PrismaRecipientMapper.toDomain)
  }

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.create({
      data,
    });

    DomainEvents.dispatchEventsForAggregate(recipient.id);
  }

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.update({
      where: {
        id: recipient.id.toString(),
      },
      data
    })
  }

  async delete(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.delete({
      where: {
        id: data.id
      }
    })
  }
}