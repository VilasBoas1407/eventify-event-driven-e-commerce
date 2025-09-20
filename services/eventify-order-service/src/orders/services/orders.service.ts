import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { OrderRepository } from '../repository/orders.repository';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const order = await this.orderRepository.create(request);
    //Dispara um evento de "OrderCreated"
    return order.id;
  }
}
