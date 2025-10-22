export class Order {
  _id: string;
  items: OrderItem[];
  customer: Customer;
  payment: Payment;
  status: string;
  createdAt: Date;
  updateAt: Date;
}

export class OrderItem {
  productId: string;
  count: number;
  price: number;
}

export class Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  deliveryAddress: DeliveryAddress;
}

export class DeliveryAddress {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  state: string;
}

export class Payment {
  cardId: string;
  bin: string;
  numberToken: string;
  cardholderName: string;
  securityCode: string;
  brand: string;
  expirationMonth: string;
  expirationYear: string;
}
