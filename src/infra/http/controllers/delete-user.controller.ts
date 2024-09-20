import { BadRequestException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteUserUseCase } from "@/domain/fastfeet/application/use-cases/delete-user";

@Controller('/users/:id')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') userId: string,
  ) {
    const result = await this.deleteUserUseCase.execute({
      userId
    })

    if (result.isRight()) {
      return { message: "Cadastro deletado com sucesso" };
    }

    throw new BadRequestException("Falha ao cadastrar o usuário");
  }
}