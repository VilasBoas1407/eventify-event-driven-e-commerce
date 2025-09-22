// order/repositories/order.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { OrderStatus } from 'src/shared/enum/OrderStatus';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(order: CreateOrderRequest): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    createdOrder.status = OrderStatus.CREATED;
    createdOrder.save();

    return createdOrder;
  }

  async update(order: Order): Promise<void> {
    await this.orderModel.findByIdAndUpdate(order.id, order).exec();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
