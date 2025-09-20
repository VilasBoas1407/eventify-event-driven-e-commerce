export const ORDER_CREATED_EVENT = "order-created";

export class OrderCreatedEvent {
  constructor(orderId: string, costumerId: string) {
    this.orderId = orderId;
    this.costumerId = costumerId;
  }

  orderId: string;
  costumerId: string;
}
