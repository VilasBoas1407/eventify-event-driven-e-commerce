export const ORDER_CONFIRMED_EVENT = "order-confirmed";
export interface OrderConfirmedEvent {
  orderId: string;
  confirmedAt: string;
}
