import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './services/orders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderRequest } from './contracts/create-order.contract';
import { CreateOrderUseCase } from './useCases/create-order.use-case';

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrderService,
    private readonly handleCreateOrderUseCase: CreateOrderUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@Body() request: CreateOrderRequest) {
    const orderId = await this.handleCreateOrderUseCase.execute(request);
    return { message: 'Order created successfully', order: orderId };
  }
}
