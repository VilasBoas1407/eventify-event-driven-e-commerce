import { BaseSchema } from 'src/shared/BaseSchema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentStatus } from '../enum/payment-status.enum';

@Schema({ optimisticConcurrency: true })
export class OrderPayment extends BaseSchema {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  status: PaymentStatus;

  @Prop({ required: true })
  paymentAt: Date;
}

export const OrderPaymentSchema = SchemaFactory.createForClass(OrderPayment);
