import { Recipient } from "@/domain/fastfeet/enterprise/recipient";

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      email: recipient.email,
      address: recipient.address,
      phone: recipient.phone,
    }
  }
}