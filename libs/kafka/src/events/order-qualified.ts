export const ORDER_QUALIFIED_EVENT = "order-qualified";
export const ORDER_QUALIFIED_DLQ_EVENT = "order-qualified-dlq";
export interface OrderQualifiedEvent {
  orderId: string;
  qualified: boolean;
  reason?: string;
  qualifiedAt: Date;
}
