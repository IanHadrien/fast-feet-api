import { MarkWithDeliverOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-deliver-order";
import { BadRequestException, Controller, HttpCode, Param, Put } from "@nestjs/common";

@Controller('/orders/:id/deliver')
export class MarkWithDeliverOrderController {
  constructor(private markWithDeliverOrderUseCase: MarkWithDeliverOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') orderId: string,
  ) {
    const result = await this.markWithDeliverOrderUseCase.execute(orderId)

    if (result.isRight()) {
      return { message: "Encomenda entrgue com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}