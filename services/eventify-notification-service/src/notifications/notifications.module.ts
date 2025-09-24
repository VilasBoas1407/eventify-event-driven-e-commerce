import { Module } from '@nestjs/common';
import { HandleOrderCreatedUseCase } from './useCases/handle-order-created.use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [HandleOrderCreatedUseCase],
})
export class NotificationsModule {}
