import { Module } from '@nestjs/common';
import { InventoryController } from './inventory/controllers/inventory.controller';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './inventory/controllers/product.controller';

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
    InventoryModule,
  ],
})
export class AppModule {}
