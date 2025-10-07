import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  ORDER_CANCELED_EVENT,
  ORDER_CONFIRMED_EVENT,
  OrderCanceledEvent,
  OrderConfirmedEvent,
  OrderQualifiedEvent,
} from '@vilasboas1407/kafka';
import { OrderRepository } from '../repository/orders.repository';
import { OrderStatus } from 'src/shared/enum/OrderStatus';
import { Order } from '../schemas/order.schema';
@Injectable()
export class HandleOrderQualifiedUseCase {
  private readonly logger = new Logger(HandleOrderQualifiedUseCase.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async execute(message: OrderQualifiedEvent): Promise<void> {
    const order = await this.orderRepository.findById(message.orderId);

    if (!order) {
      this.logger.error(`Order with id ${message.orderId} not found`);
      return;
    }

    if ([OrderStatus.CANCELED, OrderStatus.CONFIRMED].includes(order.status)) {
      this.logger.warn(`Order ${message.orderId} already finalized with status ${order.status}`);
      return;
    }

    order.qualifiedAt = new Date(message.qualifiedAt);
    this.logger.log(`Order ${order.id} qualifiedAt set to ${order.qualifiedAt.toISOString()}`);

    if (!message.qualified) {
      await this.cancelOrder(order, message.reason);
    } else if (order.status === OrderStatus.RESERVED && message.qualified) {
      await this.confirmOrder(order);
    } else {
      this.logger.log(`Order ${order.id} marked as QUALIFIED, waiting for reservation`);
      order.status = OrderStatus.QUALIFIED;
    }

    await this.orderRepository.update(order);
  }

  private async cancelOrder(order: Order, reason?: string): Promise<void> {
    this.logger.warn(`Order ${order.id} canceled due to qualification failure: ${reason}`);
    order.status = OrderStatus.CANCELED;
    order.canceledAt = new Date();
    order.canceledReason = reason;

    const message: OrderCanceledEvent = {
      orderId: order.id,
      reason: reason || 'Not specified',
      canceledAt: order.canceledAt,
    };

    await this.kafkaService.sendMessage(ORDER_CANCELED_EVENT, message);
  }

  private async confirmOrder(order: Order): Promise<void> {
    this.logger.log(`Order ${order.id} confirmed (qualified + reserved)`);
    order.status = OrderStatus.CONFIRMED;
    order.confirmedAt = new Date();
    await this.orderRepository.update(order);

    const orderConfirmedEvent: OrderConfirmedEvent = {
      orderId: order.id,
      confirmedAt: order.confirmedAt.toISOString(),
    };

    await this.kafkaService.sendMessage(ORDER_CONFIRMED_EVENT, orderConfirmedEvent);
  }
}
