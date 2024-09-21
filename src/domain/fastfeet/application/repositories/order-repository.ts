import { Order } from "../../enterprise/entities/order";

export abstract class OrderRepository {
  abstract findById(id: string): Promise<Order | null>
  abstract findMany(): Promise<Order[]>
  abstract findManyPendingByUserId(userId: string): Promise<Order[]>
  abstract findManyCompletedByUserId(userId: string): Promise<Order[]>
  abstract create(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
  abstract markWithWaiting(id: string): Promise<void>
  abstract markWithPickUp(id: string): Promise<void>
  abstract markWithDeliver(id: string): Promise<void>
  abstract markWithReturned(id: string): Promise<void>
}