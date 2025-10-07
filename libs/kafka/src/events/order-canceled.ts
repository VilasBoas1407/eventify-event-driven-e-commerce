export const ORDER_CANCELED_EVENT = "order-canceled";

export interface OrderCanceledEvent {
  orderId: string;
  reason: string;
  canceledAt: Date;
}
