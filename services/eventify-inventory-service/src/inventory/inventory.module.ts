import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { KafkaModule } from '@vilasboas1407/kafka';
import {
  ProductReservation,
  ProductReservationSchema,
} from './schema/product-reservation.schema';
import { InventoryController } from './controllers/inventory.controller';
import { ProductRepository } from './repository/product.repository';
import { CreateProductUseCase } from './useCases/create-product.use-case';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductReservation.name, schema: ProductReservationSchema },
    ]),
    KafkaModule,
  ],
  controllers: [InventoryController, ProductController],
  providers: [ProductRepository, CreateProductUseCase, ProductService],
})
export class InventoryModule {}
