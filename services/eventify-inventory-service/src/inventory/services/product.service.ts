import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.productRepository.findByIds(ids);
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    const product = await this.getById(productId);
    product.stock += quantity;
    await this.productRepository.update(product);
  }
}
