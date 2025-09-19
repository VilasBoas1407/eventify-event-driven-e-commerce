import { Prop } from '@nestjs/mongoose';

export class BaseSchema extends Document {
  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updateAt: Date;
}
