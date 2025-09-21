import { Injectable, Logger } from '@nestjs/common';
import { OrderCreatedEvent } from '@vilasboas1407/kafka';

@Injectable()
export class QualificationService {
  private readonly logger = new Logger(QualificationService.name);

  async process(data: OrderCreatedEvent) {
    this.logger.log(
      `Processing order - ${data.orderId}: ${JSON.stringify(data)}`,
    );
  }
}
