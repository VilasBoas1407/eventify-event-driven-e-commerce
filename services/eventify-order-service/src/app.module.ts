import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from './kafka/kafka.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna as variáveis disponíveis em todo o app
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI_ORDER_SERVICE'),
      }),
    }),
    OrdersModule,
    KafkaModule,
  ],
})
export class AppModule {}
