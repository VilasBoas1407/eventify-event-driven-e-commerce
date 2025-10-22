import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase } from '../useCases/create-product.use-case';
import { CreateProductRequest } from '../contracts/create-product.contract';
import { ProductService } from '../services/product.service';

@ApiTags('products')
@Controller('api/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getProducts() {
    return await this.productService.getAll();
  }

  @Post()
  async createProduct(@Body() request: CreateProductRequest) {
    return await this.createProductUseCase.execute(request);
  }

  @Get(})
}
