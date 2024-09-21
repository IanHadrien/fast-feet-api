import { MarkWithPickUpOrderUseCase } from "@/domain/fastfeet/application/use-cases/mark-with-pickup-order";
import { BadRequestException, Controller, HttpCode, Param, Put } from "@nestjs/common";

@Controller('/orders/:id/pickup')
export class MarkWithPickUpOrderController {
  constructor(private markWithPickUpOrderUseCase: MarkWithPickUpOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') orderId: string,
  ) {
    const result = await this.markWithPickUpOrderUseCase.execute(orderId)

    if (result.isRight()) {
      return { message: "Encomenda entrgue com sucesso" };
    }

    throw new BadRequestException("Falha ao deletar");
  }
}