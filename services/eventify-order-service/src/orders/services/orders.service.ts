import { KafkaService, ORDER_CREATED_EVENT, OrderCreatedEvent } from '@vilasboas1407/kafka';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { Order } from '../schemas/order.schema';
import { OrderRepository } from '../repository/orders.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async createOrder(request: CreateOrderRequest): Promise<string> {
    const order = await this.orderRepository.create(request);

    const message = this.mapToOrderCreatedEvent(order);

    try {
      this.logger.log(`Sending Kafka event: ${JSON.stringify(message)}`);
      await this.kafkaService.sendMessage(ORDER_CREATED_EVENT, message);
    } catch (err) {
      this.logger.error(`Failed to send Order Created - Order Id ${order} event: ${err.message}`);
    }

    return order.id;
  }

  private mapToOrderCreatedEvent(order: Order): OrderCreatedEvent {
    return {
      orderId: order.id,
      customerId: order.customer.id,
      items: order.items.map((item) => ({ productId: item.productId, count: item.count })),
      deliveryAddress: order.customer.deliveryAddress,
      createdAt: order.createdAt.toISOString(),
    };
  }
}
