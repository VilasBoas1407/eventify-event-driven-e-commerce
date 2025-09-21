import { Injectable, Logger } from '@nestjs/common';
import { OrderCreatedEvent } from '@vilasboas1407/kafka';

@Injectable()
export class QualificationService {
  private readonly logger = new Logger(QualificationService.name);

  async process(data: OrderCreatedEvent) {
    this.logger.log(
      `Processing order - ${data.orderId}: ${JSON.stringify(data)}`,
    );

    const isCapital = this.isCapital(data.deliveryAddress.city);

    if (isCapital) {
      this.logger.log(
        `Order ${data.orderId} is from a capital city: ${data.deliveryAddress.city}`,
      );
    } else {
      this.logger.log(
        `Order ${data.orderId} is NOT from a capital city: ${data.deliveryAddress.city}`,
      );
    }
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
