import { BadRequestException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteRecipientUseCase } from "@/domain/fastfeet/application/use-cases/delete-recipient";

@Controller('/recipients/:id')
export class DeleteRecipientController {
  constructor(private deleteRecipientUseCase: DeleteRecipientUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') recipientId: string,
  ) {
    const result = await this.deleteRecipientUseCase.execute({
      recipientId
    })

    if (result.isRight()) {
      return { message: "Registro deletado com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}