export interface OrderQualifiedEvent {
  orderId: string;
  qualified: boolean;
  reason?: string;
  qualifiedAt: Date;
}
