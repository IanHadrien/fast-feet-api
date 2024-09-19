import { BadRequestException, Controller, Get, HttpCode } from "@nestjs/common";
import { GetUserUseCase } from "@/domain/fastfeet/application/use-cases/get-user";
import { UserPresenter } from "../presenters/user-presenter";

@Controller('/users')
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.getUserUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const users = result.value.users

    return { users: users.map(UserPresenter.toHTTP) }
  }
}