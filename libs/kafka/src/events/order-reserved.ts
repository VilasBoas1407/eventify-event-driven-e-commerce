export const ORDER_RESERVED_EVENT = "order-reserved";

export interface OrderReservedEvent {
  orderId: string;
  reservedAt: Date;
}
