import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findBySku(sku: string): Promise<Product | null> {
    return await this.productModel.findOne({ sku }).exec();
  }

  async create(product: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return await createdProduct.save();
  }

  async update(product: Product): Promise<void> {
    await this.productModel.findByIdAndUpdate(product.id, product).exec();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
