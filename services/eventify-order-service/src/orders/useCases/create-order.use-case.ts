import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest, ProductItemRequest } from '../contracts/create-order.contract';
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
    request.items = this.groupOrderItems(request.items);

    const order = await this.orderRepository.create(request);
    this.logger.log(`Order created with ID: ${order.id}`);

    const message = this.mapToOrderCreatedEvent(order);
    try {
      this.logger.log(`Sending ORDER_CREATED_EVENT to Kafka: ${JSON.stringify(message)}`);
      await this.kafkaService.sendMessage(ORDER_CREATED_EVENT, message);
      this.logger.log(`Kafka event ORDER_CREATED_EVENT sent successfully for order ${order.id}`);
    } catch (err) {
      this.logger.error(`Failed to send Kafka event for order ${order.id}: ${err.message}`);
    }

    return order.id;
  }

  private groupOrderItems(items: ProductItemRequest[]) {
    const map = new Map<string, number>();
    for (const item of items) {
      if (map.has(item.productId)) {
        map.set(item.productId, map.get(item.productId)! + item.count);
      } else {
        map.set(item.productId, item.count);
      }
    }
    return Array.from(map.entries()).map(([productId, count]) => ({ productId, count }));
  }

  private mapToOrderCreatedEvent(order: Order): OrderCreatedEvent {
    return {
      orderId: order.id,
      customerEmail: order.customer.email,
      customerId: order.customer.id,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      items: order.items.map((item) => ({ productId: item.productId, count: item.count })),
      deliveryAddress: order.customer.deliveryAddress,
      createdAt: order.createdAt.toISOString(),
    };
  }
}
