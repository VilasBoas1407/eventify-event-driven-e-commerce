export const ORDER_CREATED_EVENT = "order-created";

export interface OrderCreatedEvent {
  orderId: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  deliveryAddress: DeliveryAddress;
  items: ProductItem[];
  createdAt: string;
}

export interface ProductItem {
  productId: string;
  count: number;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  state: string;
}
