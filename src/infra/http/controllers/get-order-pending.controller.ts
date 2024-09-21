import { GetOrderPendingUseCase } from "@/domain/fastfeet/application/use-cases/get-order-pending";
import { BadRequestException, Controller, Get, HttpCode, Param } from "@nestjs/common";

@Controller('/orders/user/:id/pending')
export class GetOrderPendingController {
  constructor(private getOrderPendingUseCase: GetOrderPendingUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param('id') userId: string,
  ) {
    const result = await this.getOrderPendingUseCase.execute(userId)

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const orders = result.value.orders.map(order => ({
      id: order.id.toString(),            
      status: order.status,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,      
      returnDate: order.returnDate,          
      userId: order.userId.toString(),       
      recipientId: order.recipientId.toString()
    }));

    return { orders };
  }
}