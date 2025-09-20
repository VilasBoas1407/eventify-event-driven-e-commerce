import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { OrderRepository } from '../repository/orders.repository';
import { Order } from '../schemas/order.schema';
import { KafkaService } from 'src/kafka/services/kafka.service';
import { ORDER_CREATED_TOPIC } from 'src/kafka/constants/kafka.constants';

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
    await this.kafkaService.emit(ORDER_CREATED_TOPIC, order);
    return order.id;
  }
}
