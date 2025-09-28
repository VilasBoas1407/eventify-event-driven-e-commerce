import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/shared/BaseSchema';

@Schema()
export class ProductReservation extends BaseSchema {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: Date.now })
  reservedAt: Date;
}

export const ProductReservationSchema =
  SchemaFactory.createForClass(ProductReservation);
