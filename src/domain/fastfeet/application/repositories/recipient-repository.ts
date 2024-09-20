import { Recipient } from "../../enterprise/recipient";

export abstract class RecipientRepository {
  abstract findByEmail(email: string): Promise<Recipient | null>
  abstract findById(id: string): Promise<Recipient | null>
  abstract findMany(): Promise<Recipient[]>
  abstract create(recipient: Recipient): Promise<void>
  abstract save(recipient: Recipient): Promise<void>
  abstract delete(recipient: Recipient): Promise<void>
}