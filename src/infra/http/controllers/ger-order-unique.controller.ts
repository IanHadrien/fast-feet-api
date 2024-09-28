import { BadRequestException, Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetOrderUniqueUseCase } from "@/domain/fastfeet/application/use-cases/get-order-unique";

@Controller('/orders/:id')
export class GetOrderUniqueController {
  constructor(private getOrderUseCase: GetOrderUniqueUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param('id') id: string,
  ) {
    const result = await this.getOrderUseCase.execute(id)

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const order = result.value.order

    return { 
      order 
    }
  }
}