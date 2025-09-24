import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { OrderCreatedConsumer } from './notifications/events/order-created.consumer';

@Module({
  imports: [NotificationsModule],
  controllers: [OrderCreatedConsumer],
  providers: [AppService],
})
export class AppModule {}
