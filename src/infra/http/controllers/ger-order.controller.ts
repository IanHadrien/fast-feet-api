import { BadRequestException, Controller, Get, HttpCode } from "@nestjs/common";
import { GetOrderUseCase } from "@/domain/fastfeet/application/use-cases/get-order";
import { OrderPresenter } from "../presenters/order-presenter";

@Controller('/orders')
export class GetOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.getOrderUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const orders = result.value.orders

    return { orders: orders.map(OrderPresenter.toHTTP) }
  }
}