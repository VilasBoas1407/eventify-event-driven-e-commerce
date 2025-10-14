import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_RESERVED_EVENT } from '@vilasboas1407/kafka';
import type { OrderReservedEvent } from '@vilasboas1407/kafka';
import { HandlerOrderReservatedUseCase } from '../useCases/handle-order-reservated.use-case';

@Controller()
export class OrderReservatedConsumer {
  constructor(private readonly handleOrderReservatedEvent: HandlerOrderReservatedUseCase) {}

  @MessagePattern(ORDER_RESERVED_EVENT)
  async handleOrderCreated(@Payload() message: OrderReservedEvent) {
    await this.handleOrderReservatedEvent.execute(message);
  }
}
