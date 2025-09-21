import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { QualificationService } from '../qualification/qualification.service';
import { ORDER_CREATED_EVENT, OrderCreatedEvent } from '@vilasboas1407/kafka';

@Controller()
export class QualificationConsumer {
  constructor(private readonly qualificationService: QualificationService) {}
  private readonly logger = new Logger(QualificationConsumer.name);

  @MessagePattern(ORDER_CREATED_EVENT)
  async handleQualificationOrderCreatedEvent(
    @Payload() message: OrderCreatedEvent,
  ) {
    await this.qualificationService.process(message);
  }
}
