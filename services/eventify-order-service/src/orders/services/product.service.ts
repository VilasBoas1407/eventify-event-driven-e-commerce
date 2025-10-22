import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  private readonly baseUrl = 'http://localhost:5001/api/products';
  constructor(private readonly httpService: HttpService) {}

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    try {
      const idsParam = productIds.join(',');
      const response: AxiosResponse<Product[]> = await firstValueFrom(
        this.httpService.get<Product[]>(`${this.baseUrl}?ids=${idsParam}`)
      );

      return response.data.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
      }));
    } catch (error: any) {
      this.logger.error(`Error fetching products: ${error.message}`);
      throw error;
    }
  }
}
