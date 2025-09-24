import { Injectable } from '@nestjs/common';
import type { OrderCreatedEvent } from '@vilasboas1407/kafka';
@Injectable()
export class HandleOrderCreatedUseCase {
  constructor() {}

  async execute(message: OrderCreatedEvent): Promise<void> {
    console.log('Order Created Event Received:', message);

    // Recover customer email from message
  }
}
