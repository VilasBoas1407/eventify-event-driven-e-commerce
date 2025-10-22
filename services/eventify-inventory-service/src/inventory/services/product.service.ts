import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../schema/product.schema';
import { ProductResponse } from '../contracts/get-product-by-id/product-response.contract';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductsByIds(ids: string[]): Promise<ProductResponse[]> {
    this.logger.log(`Fetching products with IDs: ${ids.join(', ')}`);

    const products = await this.productRepository.findByIds(ids);

    return products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    }));
  }

  async getById(id: string): Promise<ProductResponse> {
    this.logger.log(`Fetching product with ID: ${id}`);
    const product = await this.productRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with ID: ${id} not found`);
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const response: ProductResponse = {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    };

    return response;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    this.logger.log(`Fetching products with IDs: ${ids.join(', ')}`);
    return this.productRepository.findByIds(ids);
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    this.logger.log(
      `Updating stock for product ID: ${productId} by quantity: ${quantity}`,
    );
    const product = await this.productRepository.findById(productId);

    if (!product) {
      this.logger.error(`Product with ID: ${productId} not found`);
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    product.stock += quantity;
    await this.productRepository.update(product);
  }
}
