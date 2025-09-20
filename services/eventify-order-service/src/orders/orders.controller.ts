import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  getOrders(): any[] {
    return this.ordersService.getOrders();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  createOrder(@Body() orderData: any): any {
    return this.ordersService.createOrder(orderData);
  }
}
