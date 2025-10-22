import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { Order } from '../models/order-response.model';

@Injectable()
export class OrderApiService {
  private readonly baseUrl = 'http://localhost:5000/api/orders';

  constructor(private readonly httpService: HttpService) {}

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await firstValueFrom(
        this.httpService.get<Order>(`${this.baseUrl}/${orderId}`),
      );
      return plainToInstance(Order, response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao buscar pedido ${orderId}:`, error.message);
      } else {
        console.error(`Erro desconhecido ao buscar pedido ${orderId}:`, error);
      }
      throw error;
    }
  }
}
