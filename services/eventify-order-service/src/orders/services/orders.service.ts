import { KafkaService } from '@vilasboas1407/kafka';
import { Order } from '../schemas/order.schema';
import { OrderRepository } from '../repository/orders.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }
}
