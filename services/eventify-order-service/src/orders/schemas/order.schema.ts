import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/shared/BaseSchema';
import { OrderStatus } from 'src/shared/enum/OrderStatus';

export class ProductItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  price: number;
}

export class DeliveryAddress {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  state: string;
}

export class Customer {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  firstName: string;
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: Object })
  deliveryAddress: DeliveryAddress;
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

@Schema()
export class Order extends BaseSchema {
  @Prop({ required: true, type: Array })
  items: ProductItem[];

  @Prop({ required: true, type: Object })
  customer: Customer;

  @Prop({ required: true, type: Object })
  payment: Payment;

  orderStatus: OrderStatus;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
