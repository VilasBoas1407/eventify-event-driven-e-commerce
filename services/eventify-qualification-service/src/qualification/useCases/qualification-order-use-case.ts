import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaService,
  ORDER_QUALIFIED_DLQ_EVENT,
  ORDER_QUALIFIED_EVENT,
  OrderCreatedEvent,
  OrderQualifiedEvent,
} from '@vilasboas1407/kafka';
import axios from 'axios';

@Injectable()
export class QualificationOrderUseCase {
  private readonly logger = new Logger(QualificationOrderUseCase.name);
  constructor(private readonly kafkaService: KafkaService) {}

  async execute(data: OrderCreatedEvent) {
    try {
      this.logger.log(
        `Processing order - ${data.orderId}: ${JSON.stringify(data)}`,
      );

      const message = {
        orderId: data.orderId,
        qualified: false,
        reason: '',
        qualifiedAt: new Date(),
      } as OrderQualifiedEvent;

      const postalCode = data.deliveryAddress.postalCode.replace(/\D/g, '');

      if (postalCode.length !== 8) {
        message.reason = `Invalid CEP format: ${postalCode}`;
        message.qualified = false;
        await this.kafkaService.sendMessage(ORDER_QUALIFIED_EVENT, message);
        return;
      }

      const isCapital = await this.isCapital(postalCode);

      message.qualified = isCapital;
      message.reason = !isCapital ? 'Customer is not from a capital city' : '';

      await this.kafkaService.sendMessage(ORDER_QUALIFIED_EVENT, message);
      this.logger.log(`Processed order - ${data.orderId}`);
    } catch (error) {
      this.logger.error(
        `Failed to process order ${data.orderId}: ${error.message}`,
      );

      await this.kafkaService.sendMessage(ORDER_QUALIFIED_DLQ_EVENT, {
        originalMessage: data,
        error: error.message,
        failedAt: new Date(),
      });
    }
  }

  private async isCapital(cep: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { localidade, uf, erro } = response.data;
      if (erro) return false;

      const capitals: Record<string, string> = {
        AC: 'Rio Branco',
        AL: 'Maceió',
        AP: 'Macapá',
        AM: 'Manaus',
        BA: 'Salvador',
        CE: 'Fortaleza',
        DF: 'Brasília',
        ES: 'Vitória',
        GO: 'Goiânia',
        MA: 'São Luís',
        MT: 'Cuiabá',
        MS: 'Campo Grande',
        MG: 'Belo Horizonte',
        PA: 'Belém',
        PB: 'João Pessoa',
        PR: 'Curitiba',
        PE: 'Recife',
        PI: 'Teresina',
        RJ: 'Rio de Janeiro',
        RN: 'Natal',
        RS: 'Porto Alegre',
        RO: 'Porto Velho',
        RR: 'Boa Vista',
        SC: 'Florianópolis',
        SP: 'São Paulo',
        SE: 'Aracaju',
        TO: 'Palmas',
      };

      return capitals[uf] === localidade;
    } catch (err) {
      this.logger.error(`Error fetching CEP ${cep}: ${err.message}`);
      return false;
    }
  }
}
