import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  OrderConfirmedEvent,
  PaymentAuthorizedEvent,
  PAYMENT_AUTHORIZED,
} from '@vilasboas1407/kafka';
import { OrderPaymentRepository } from '../repository/order-payment.repository';
import { OrderPayment } from '../schemas/order-payment.schema';
import { PaymentStatus } from '../enum/payment-status.enum';
import { OrderApiService } from '../services/order.service';

@Injectable()
export class HandleOrderConfirmedUseCase {
  private readonly logger = new Logger(HandleOrderConfirmedUseCase.name);

  constructor(
    protected readonly orderPaymentRepository: OrderPaymentRepository,
    protected readonly kafkaService: KafkaService,
    private readonly orderService: OrderApiService,
  ) {}

  async execute(message: OrderConfirmedEvent): Promise<void> {
    this.logger.log(
      `Processing OrderConfirmedEvent for orderId: ${message.orderId}`,
    );

    const orderPayment = await this.orderPaymentRepository.findByOrderId(
      message.orderId,
    );

    if (!orderPayment) {
      this.logger.error(
        `OrderPayment for orderId ${message.orderId} not found`,
      );

      const order = await this.orderService.getOrderById(message.orderId);

      if (!order) {
        throw new Error(`Order with id ${message.orderId} not found`);
      }

      this.logger.log(`Validating payment for orderId: ${message.orderId}`);
      const orderPayment = new OrderPayment({
        orderId: message.orderId,
        status: PaymentStatus.CONFIRMED,
        amount: order.amount,
        paymentAt: new Date(),
        createdAt: new Date(),
      });

      await this.orderPaymentRepository.create(orderPayment);

      const paymentAuthorizedEvent: PaymentAuthorizedEvent = {
        orderId: message.orderId,
        authorizedAt: new Date(),
      };

      this.logger.log(
        `Publishing PaymentAuthorizedEvent for orderId: ${message.orderId}`,
      );

      await this.kafkaService.sendMessage(
        PAYMENT_AUTHORIZED,
        paymentAuthorizedEvent,
      );

      this.logger.log(
        `OrderConfirmedEvent processed successfully for orderId: ${message.orderId}`,
      );
    }
  }
}
