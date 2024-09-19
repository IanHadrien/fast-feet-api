import { User } from "@/domain/fastfeet/enterprise/user";

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      currentLocation: user.currentLocation,
      password: user.password,
      role: user.role,
    }
  }
}