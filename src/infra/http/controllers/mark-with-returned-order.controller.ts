import { MarkWithReturnedOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-returned-order";
import { BadRequestException, Controller, HttpCode, Param, Put } from "@nestjs/common";

@Controller('/orders/:id/returned')
export class MarkWithReturnedOrderController {
  constructor(private markWithReturnedOrderUseCase: MarkWithReturnedOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') orderId: string,
  ) {
    const result = await this.markWithReturnedOrderUseCase.execute(orderId)

    if (result.isRight()) {
      return { message: "Encomenda devolvido com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}