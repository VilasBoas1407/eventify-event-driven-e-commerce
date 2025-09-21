export const ORDER_QUALIFIED_EVENT = "order-qualified";
export interface OrderQualifiedEvent {
  orderId: string;
  qualified: boolean;
  reason?: string;
  qualifiedAt: Date;
}
