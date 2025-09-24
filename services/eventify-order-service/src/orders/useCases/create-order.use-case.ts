import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from '../contracts/create-order.contract';
import { OrderRepository } from '../repository/orders.repository';
import { KafkaService, ORDER_CREATED_EVENT, OrderCreatedEvent } from '@vilasboas1407/kafka';
import { Order } from '../schemas/order.schema';

@Injectable()
export class CreateOrderUseCase {
  private readonly logger = new Logger(CreateOrderUseCase.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async execute(request: CreateOrderRequest): Promise<string> {
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
      customerEmail: order.customer.email,
      customerId: order.customer.id,
      items: order.items.map((item) => ({ productId: item.productId, count: item.count })),
      deliveryAddress: order.customer.deliveryAddress,
      createdAt: order.createdAt.toISOString(),
    };
  }
}
