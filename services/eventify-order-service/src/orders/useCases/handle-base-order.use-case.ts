import {
  KafkaService,
  ORDER_CANCELED_EVENT,
  ORDER_CONFIRMED_EVENT,
  OrderCanceledEvent,
  OrderConfirmedEvent,
} from '@vilasboas1407/kafka';
import { OrderRepository } from '../repository/orders.repository';
import { OrderStatus } from 'src/shared/enum/OrderStatus';
import { Logger } from '@nestjs/common';
import { Order } from '../schemas/order.schema';

export class HandlerOrderBase {
  protected readonly logger: Logger;
  constructor(
    protected readonly orderRepository: OrderRepository,
    protected readonly kafkaService: KafkaService
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  protected async confirmOrder(order: Order): Promise<void> {
    try {
      order.status = OrderStatus.CONFIRMED;
      order.confirmedAt = new Date();
      await this.orderRepository.update(order);
    } catch (err) {
      this.logger.error(`Failed to update order ${order.id}: ${err.message}`);
      throw err;
    }

    try {
      const orderConfirmedEvent: OrderConfirmedEvent = {
        orderId: order.id,
        confirmedAt: order.confirmedAt.toISOString(),
      };
      await this.kafkaService.sendMessage(ORDER_CONFIRMED_EVENT, orderConfirmedEvent);
    } catch (err) {
      this.logger.error(`Failed to send Kafka message for order ${order.id}: ${err.message}`);
      throw err;
    }
  }

  protected async cancelOrder(order: Order, reason?: string): Promise<void> {
    this.logger.warn(`Order ${order.id} canceled due to qualification failure: ${reason}`);
    order.status = OrderStatus.CANCELED;
    order.canceledAt = new Date();
    order.canceledReason = reason;

    const message: OrderCanceledEvent = {
      orderId: order.id,
      reason: reason || 'Not specified',
      canceledAt: order.canceledAt,
    };

    try {
      await this.kafkaService.sendMessage(ORDER_CANCELED_EVENT, message);
    } catch (err) {
      this.logger.error(`Failed to send Kafka message for order ${order.id}: ${err.message}`);
      throw err;
    }
  }
}
