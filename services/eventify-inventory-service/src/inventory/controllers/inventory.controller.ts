import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase } from '../useCases/create-product.use-case';

@ApiTags('inventory')
@Controller('api/inventory')
export class InventoryController {}
