import { AggregateRoot } from "src/core/entities/aggregate-root"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface RecipientProps {
  recipientId: string
  name: string
  address: string
  phone: string
  email: string
}

export class Recipient extends AggregateRoot<RecipientProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  static create(
    props: RecipientProps,
    id?: UniqueEntityID,
  ) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}