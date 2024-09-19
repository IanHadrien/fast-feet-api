import { AggregateRoot } from "src/core/entities/aggregate-root"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface UserProps {
  userId: string
  name: string
  cpf: string
  password: string
  currentLocation?: string | null
  role: string
}

export class User extends AggregateRoot<UserProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get currentLocation() {
    return this.props.currentLocation ?? ''
  }

  set currentLocation(currentLocation: string) {
    if (currentLocation === undefined || currentLocation === null) {
      return
    }

    this.props.currentLocation = currentLocation
  }

  get role() {
    return this.props.role
  }

  set role(role: string) {
    this.props.role = role
  }

  static create(
    props: UserProps,
    id?: UniqueEntityID,
  ) {
    const user = new User(props, id)

    return user
  }
}