import { DeleteOrderUseCase } from "@/domain/fastfeet/application/use-cases/delete-order";
import { BadRequestException, Controller, Delete, HttpCode, Param } from "@nestjs/common";

@Controller('/orders/:id')
export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') orderId: string,
  ) {
    const result = await this.deleteOrderUseCase.execute({
      orderId
    })

    if (result.isRight()) {
      return { message: "Registro deletado com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}