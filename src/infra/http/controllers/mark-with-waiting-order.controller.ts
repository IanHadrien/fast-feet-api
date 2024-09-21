import { BadRequestException, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { MarkWithWaitingOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-waiting-order";

@Controller('/orders/:id/waiting')
export class MarkWithWaitingOrderController {
  constructor(private markWithWaitingOrderUseCase: MarkWithWaitingOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') orderId: string,
  ) {
    const result = await this.markWithWaitingOrderUseCase.execute(orderId)

    if (result.isRight()) {
      return { message: "Encomenda atualizada com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}