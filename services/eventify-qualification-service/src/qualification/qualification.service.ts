import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  ORDER_QUALIFIED_EVENT,
  OrderCreatedEvent,
  OrderQualifiedEvent,
} from '@vilasboas1407/kafka';

@Injectable()
export class QualificationService {
  private readonly logger = new Logger(QualificationService.name);
  constructor(private readonly kafkaService: KafkaService) {}

  async process(data: OrderCreatedEvent) {
    this.logger.log(
      `Processing order - ${data.orderId}: ${JSON.stringify(data)}`,
    );

    const isCapital = this.isCapital(data.deliveryAddress.city);

    const reason = !isCapital ? 'Customer is not from a capital city' : '';

    const message = {
      orderId: data.orderId,
      qualified: isCapital,
      reason,
      qualifiedAt: new Date(),
    } as OrderQualifiedEvent;

    await this.kafkaService.sendMessage(ORDER_QUALIFIED_EVENT, message);
  }

  isCapital(city: string): boolean {
    const capitals = [
      'Rio Branco',
      'Maceió',
      'Macapá',
      'Manaus',
      'Salvador',
      'Fortaleza',
      'Brasília',
      'Vitória',
      'Goiânia',
      'São Luís',
      'Cuiabá',
      'Campo Grande',
      'Belo Horizonte',
      'Belém',
      'João Pessoa',
      'Curitiba',
      'Recife',
      'Teresina',
      'Rio de Janeiro',
      'Natal',
      'Porto Alegre',
      'Porto Velho',
      'Boa Vista',
      'Florianópolis',
      'São Paulo',
      'Aracaju',
      'Palmas',
    ];

    return capitals.includes(city);
  }
}
