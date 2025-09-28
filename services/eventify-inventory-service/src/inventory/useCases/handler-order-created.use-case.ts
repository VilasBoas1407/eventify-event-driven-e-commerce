import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  ORDER_RESERVED_EVENT,
  OrderCreatedEvent,
} from '@vilasboas1407/kafka';
import type { OrderReservedEvent } from '@vilasboas1407/kafka';
import { ProductService } from '../services/product.service';
import { ProductReservationDTO } from '../contracts/product-reservation.dto';
import { ReservationRepository } from '../repository/product-reservation.repository';

@Injectable()
export class HandleOrderCreatedUseCase {
  private readonly logger = new Logger(HandleOrderCreatedUseCase.name);

  constructor(
    private readonly productService: ProductService,
    private readonly reservationRepository: ReservationRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async execute(message: OrderCreatedEvent) {
    const reservations: ProductReservationDTO[] = [];

    const productIds = message.items.map((item) => item.productId);
    const products = await this.productService.findByIds(productIds);

    message.items.forEach(async (item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product == null) {
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
    });

    const tasks: Promise<void>[] = [];

    for (const reservation of reservations) {
      this.logger.log(
        `Creating reservation for product ID ${reservation.productId}, quantity ${reservation.quantity}`,
      );

      tasks.push(this.createReservation(reservation));
    }

    await Promise.all(tasks);

    await this.sendOrderReservatedEvent(message.orderId);
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

  private async sendOrderReservatedEvent(orderId: string) {
    const message: OrderReservedEvent = {
      orderId: orderId,
      reservedAt: new Date(),
    };

    this.kafkaService.sendMessage(ORDER_RESERVED_EVENT, message);
  }
}
