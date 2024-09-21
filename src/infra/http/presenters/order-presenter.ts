import { Order } from "@/domain/fastfeet/enterprise/entities/order";

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      status: order.status,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,
      returnDate: order.returnDate,
      userId: order.userId.toString(),
      recipientId: order.recipientId.toString(),
    }
  }
}