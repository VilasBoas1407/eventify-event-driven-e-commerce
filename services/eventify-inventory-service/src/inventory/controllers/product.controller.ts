import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Retrieve all products' })
  async getProducts() {
    return await this.productService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() request: CreateProductRequest) {
    return await this.createProductUseCase.execute(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  async getProductById(@Body('id') id: string) {
    return await this.productService.getById(id);
  }
}
