import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderPayment } from '../schemas/order-payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderPaymentRepository {
  constructor(
    @InjectModel(OrderPayment.name) private orderPayment: Model<OrderPayment>,
  ) {}

  async create(orderPayment: OrderPayment): Promise<OrderPayment> {
    const createdOrderPayment = new this.orderPayment(orderPayment);
    await createdOrderPayment.save();
    return createdOrderPayment;
  }

  async update(orderPayment: OrderPayment): Promise<void> {
    await this.orderPayment
      .findByIdAndUpdate(orderPayment.id, orderPayment)
      .exec();
  }

  async findById(id: string): Promise<OrderPayment | null> {
    return await this.orderPayment.findById(id).exec();
  }

  async findByOrderId(orderId: string): Promise<OrderPayment | null> {
    return await this.orderPayment.findOne({ orderId }).exec();
  }
}
