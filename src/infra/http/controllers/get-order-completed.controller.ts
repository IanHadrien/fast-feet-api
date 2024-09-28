import { GetOrderCompletedUseCase } from "@/domain/fastfeet/application/use-cases/get-order-completed";
import { BadRequestException, Controller, Get, HttpCode, Param } from "@nestjs/common";

@Controller('/orders/user/:id/completed')
export class GetOrderCompletedController {
  constructor(private getOrderCompletedUseCase: GetOrderCompletedUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param('id') userId: string,
  ) {
    const result = await this.getOrderCompletedUseCase.execute(userId)

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const orders = result.value.orders.map(order => ({
      id: order.id.toString(),            
      status: order.status,
      name: order.name,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,      
      returnDate: order.returnDate,          
      userId: order.userId.toString(),       
      recipientId: order.recipientId.toString()
    }));

    return { orders };
  }
}