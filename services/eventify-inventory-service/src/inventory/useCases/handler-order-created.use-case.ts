import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  ORDER_RESERVED_EVENT,
  OrderCreatedEvent,
  OrderCanceledEvent,
  ORDER_CANCELED_EVENT,
} from '@vilasboas1407/kafka';
import type { OrderReservedEvent } from '@vilasboas1407/kafka';
import { ProductService } from '../services/product.service';
import { ProductReservationDTO } from '../contracts/product-reservation.dto';
import { ReservationRepository } from '../repository/product-reservation.repository';
import { Product } from '../schema/product.schema';

@Injectable()
export class HandleOrderCreatedUseCase {
  private readonly logger = new Logger(HandleOrderCreatedUseCase.name);

  constructor(
    private readonly productService: ProductService,
    private readonly reservationRepository: ReservationRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async execute(message: OrderCreatedEvent) {
    try {
      const reservations = await this.validateItens(message);

      const tasks: Promise<void>[] = [];

      for (const reservation of reservations) {
        this.logger.log(
          `Creating reservation for product ID ${reservation.productId}, quantity ${reservation.quantity}`,
        );

        tasks.push(this.createReservation(reservation));
      }

      await Promise.all(tasks);

      await this.sendOrderReservatedEvent(message.orderId);
    } catch (error) {
      await this.SendOrderCanceledEvent(message.orderId, error);
    }
  }

  private async validateItens(
    message: OrderCreatedEvent,
  ): Promise<ProductReservationDTO[]> {
    const reservations: ProductReservationDTO[] = [];

    try {
      const productIds = message.items.map((item) => item.productId);
      const products = await this.productService.findByIds(productIds);

      for (const item of message.items) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.count) {
          throw new Error(
            `Don't have enougth products ${product.name} on stock for the order : ${message.orderId}`,
          );
        }

        reservations.push({
          productId: item.productId,
          quantity: item.count,
          orderId: message.orderId,
        });
      }

      return reservations;
    } catch (error) {
      throw error;
    }
  }
  private async createReservation(reservation: ProductReservationDTO) {
    this.logger.log(
      `Creating reservation for product ID ${reservation.productId}, quantity ${reservation.quantity}`,
    );
    await this.reservationRepository.create(reservation);
    await this.productService.updateStock(
      reservation.productId,
      -reservation.quantity,
    );
  }

  private async SendOrderCanceledEvent(orderId: string, error: Error) {
    this.logger.error(
      `[Inventory Service] - Sending canceled event - ${error}`,
    );
    const orderCanceled: OrderCanceledEvent = {
      canceledAt: new Date(),
      orderId: orderId,
      reason: error.message,
    };
    await this.kafkaService.sendMessage(ORDER_CANCELED_EVENT, orderCanceled);
  }

  private async sendOrderReservatedEvent(orderId: string) {
    const message: OrderReservedEvent = {
      orderId: orderId,
      reservedAt: new Date(),
    };

    this.kafkaService.sendMessage(ORDER_RESERVED_EVENT, message);
  }
}
