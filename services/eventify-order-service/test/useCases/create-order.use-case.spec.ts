import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from 'src/orders/useCases/create-order.use-case';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { KafkaService, ORDER_CREATED_EVENT } from '@vilasboas1407/kafka';
import { ProductService } from 'src/orders/services/product.service';

describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let orderRepository: jest.Mocked<OrderRepository>;
  let kafkaService: jest.Mocked<KafkaService>;
  let productService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        {
          provide: OrderRepository,
          useValue: { create: jest.fn() },
        },
        {
          provide: KafkaService,
          useValue: { sendMessage: jest.fn() },
        },
        {
          provide: ProductService,
          useValue: { getProductsByIds: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    orderRepository = module.get(OrderRepository);
    kafkaService = module.get(KafkaService);
    productService = module.get(ProductService);
  });

  it('creates an order, calculates amount, groups items and sends ORDER_CREATED_EVENT', async () => {
    const request: any = {
      customer: { id: 'c1', email: 'a@b.com', firstName: 'A', lastName: 'B', deliveryAddress: {} },
      items: [
        { productId: 'p1', count: 1 },
        { productId: 'p1', count: 2 },
        { productId: 'p2', count: 1 },
      ],
    };

    productService.getProductsByIds.mockResolvedValueOnce([
      { id: 'p1', price: 10 },
      { id: 'p2', price: 5 },
    ] as any);

    const createdOrder = {
      id: 'order-1',
      customer: request.customer,
      items: [
        { productId: 'p1', count: 3 },
        { productId: 'p2', count: 1 },
      ],
      createdAt: new Date(),
    } as any;

    orderRepository.create.mockResolvedValueOnce(createdOrder);

    const resultId = await useCase.execute(request);

    expect(resultId).toBe('order-1');
    // grouped items should be passed to repository (in-place mutation)
    expect(orderRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({ productId: 'p1', count: 3 }),
          expect.objectContaining({ productId: 'p2', count: 1 }),
        ]),
        amount: 35, // (p1: 3 * 10) + (p2: 1 * 5)
      })
    );

    expect(kafkaService.sendMessage).toHaveBeenCalledWith(
      ORDER_CREATED_EVENT,
      expect.objectContaining({ orderId: 'order-1' })
    );
  });

  it('returns order id even if kafka send fails', async () => {
    const request: any = {
      customer: { id: 'c2', email: 'x@y.com', firstName: 'X', lastName: 'Y', deliveryAddress: {} },
      items: [{ productId: 'p1', count: 1 }],
    };

    productService.getProductsByIds.mockResolvedValueOnce([{ id: 'p1', price: 7 }] as any);

    const createdOrder = {
      id: 'order-2',
      customer: request.customer,
      items: [{ productId: 'p1', count: 1 }],
      createdAt: new Date(),
    } as any;

    orderRepository.create.mockResolvedValueOnce(createdOrder);
    kafkaService.sendMessage.mockRejectedValueOnce(new Error('kafka down'));

    const resultId = await useCase.execute(request);

    expect(resultId).toBe('order-2');
    expect(kafkaService.sendMessage).toHaveBeenCalled();
  });

  it('calculates amount skipping missing products and logs a warning', async () => {
    const request: any = {
      customer: { id: 'c3', email: 'z@q.com', firstName: 'Z', lastName: 'Q', deliveryAddress: {} },
      items: [
        { productId: 'p1', count: 2 },
        { productId: 'pX', count: 1 },
      ],
    };

    productService.getProductsByIds.mockResolvedValueOnce([{ id: 'p1', price: 4 }] as any);

    const createdOrder = {
      id: 'order-3',
      customer: request.customer,
      items: [
        { productId: 'p1', count: 2 },
        { productId: 'pX', count: 1 },
      ],
      createdAt: new Date(),
    } as any;

    orderRepository.create.mockResolvedValueOnce(createdOrder);

    const loggerSpy = jest.spyOn(useCase['logger'], 'warn');

    const resultId = await useCase.execute(request);

    expect(resultId).toBe('order-3');
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Product with ID pX not found'));
  });
});
