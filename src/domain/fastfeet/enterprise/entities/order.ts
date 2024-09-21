import { AggregateRoot } from "src/core/entities/aggregate-root"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface UserProps {
  status: string
  userId: UniqueEntityID
  recipientId: UniqueEntityID
  createdAt: Date
  deliveryDate?: Date | null
  returnDate?: Date | null
}

export class Order extends AggregateRoot<UserProps> {
  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get deliveryDate(): Date | null {
    return this.props.deliveryDate ?? null
  }

  set deliveryDate(deliveryDate: Date | undefined) {
    this.props.deliveryDate = deliveryDate ?? null
  }

  get returnDate(): Date | null {
    return this.props.returnDate ?? null
  }

  set returnDate(returnDate: Date | undefined) {
    this.props.returnDate = returnDate ?? null
  }

  static create(
    props: UserProps,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      }, 
      id
    )

    return order
  }
}