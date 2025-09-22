import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { KafkaModule } from '@vilasboas1407/kafka';

@Module({
  imports: [KafkaModule],
  providers: [QualificationService],
  exports: [QualificationService],
})
export class QualificationModule {}
