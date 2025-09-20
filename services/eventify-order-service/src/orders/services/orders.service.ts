import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { OrderRepository } from '../repository/orders.repository';
import { Order } from '../schemas/order.schema';
import { KafkaService, ORDER_CREATED_EVENT } from '@vilasboas1407/kafka';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const order = await this.orderRepository.create(request);
    await this.kafkaService.sendMessage(ORDER_CREATED_EVENT, order);
    return order.id;
  }
}
