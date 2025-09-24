import { Injectable } from '@nestjs/common';
import type { OrderCanceledEvent } from '@vilasboas1407/kafka';
@Injectable()
export class HandleOrderCanceledUseCase {
  constructor() {}

  async execute(message: OrderCanceledEvent): Promise<void> {
    console.log('Order Canceled Event Received:', message);

    // Recover customer email from message
  }
}
