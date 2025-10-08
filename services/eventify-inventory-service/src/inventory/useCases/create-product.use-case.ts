import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductRequest } from '../contracts/create-product.contract';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<string> {
    const existing = await this.productRepository.findBySku(request.sku);
    if (existing) {
      throw new BadRequestException('Product with this SKU already exists');
    }

    const savedProduct = await this.productRepository.create(request);

    return savedProduct.id;
  }
}
