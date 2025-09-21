import { Module } from '@nestjs/common';
import { QualificationModule } from './qualification/qualification.module';
import { QualificationConsumer } from './events/qualification-order-created.consumer';

@Module({
  imports: [QualificationModule],
  controllers: [QualificationConsumer],
})
export class AppModule {}
