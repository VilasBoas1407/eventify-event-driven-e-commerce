export const PAYMENT_AUTHORIZED = "payment-authorized";

export interface PaymentAuthorizedEvent {
  orderId: string;
  authorizedAt: Date;
}
