import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class QualificationService {
  private readonly logger = new Logger(QualificationService.name);

  async process(data: any) {
    this.logger.log(
      `Processando qualificação para o pedido: ${JSON.stringify(data)}`,
    );
  }
}
