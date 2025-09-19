import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor() {}

  getOrders(): any[] {
    return [];
  }

  createOrder(orderData: any): any {
    return { id: 'order123', ...orderData };
  }
}
