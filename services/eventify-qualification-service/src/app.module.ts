import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QualificationModule } from './qualification/qualification.module';
import { QualificationConsumer } from './events/qualification-order-created.consumer';

@Module({
  imports: [QualificationModule],
  controllers: [AppController, QualificationConsumer],
  providers: [AppService],
})
export class AppModule {}
