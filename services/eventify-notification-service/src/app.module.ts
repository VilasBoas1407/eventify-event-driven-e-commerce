import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NotificationsModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
