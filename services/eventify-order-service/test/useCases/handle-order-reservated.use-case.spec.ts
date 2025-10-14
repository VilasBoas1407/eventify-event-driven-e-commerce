import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { HandlerOrderReservatedUseCase } from 'src/orders/useCases/handle-order-reservated.use-case';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { KafkaService } from '@vilasboas1407/kafka';
import { OrderStatus } from 'src/shared/enum/OrderStatus';
import { Order } from 'src/orders/schemas/order.schema';

describe('HandlerOrderReservatedUseCase', () => {
  let useCase: HandlerOrderReservatedUseCase;
  let orderRepository: jest.Mocked<OrderRepository>;
  let kafkaService: jest.Mocked<KafkaService>;

  const mockOrder: Order = {
    id: 'order-123',
    status: OrderStatus.QUALIFIED,
    reservedAt: null,
    qualifiedAt: null,
    confirmedAt: null,
    canceledAt: null,
    canceledReason: null,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HandlerOrderReservatedUseCase,
        {
          provide: OrderRepository,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: KafkaService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<HandlerOrderReservatedUseCase>(HandlerOrderReservatedUseCase);
    orderRepository = module.get(OrderRepository);
    kafkaService = module.get(KafkaService);
  });

  it('should log error if order not found', async () => {
    orderRepository.findById.mockResolvedValueOnce(null);
    const loggerSpy = jest.spyOn(useCase['logger'], 'error');

    await useCase.execute({ orderId: 'missing-order' } as any);

    expect(loggerSpy).toHaveBeenCalledWith('Order with id missing-order not found');
    expect(orderRepository.update).not.toHaveBeenCalled();
  });

  it('should log warn if order already finalized', async () => {
    const finalizedOrder = { ...mockOrder, status: OrderStatus.CONFIRMED } as Order;
    orderRepository.findById.mockResolvedValueOnce(finalizedOrder);
    const loggerSpy = jest.spyOn(useCase['logger'], 'warn');

    await useCase.execute({ orderId: finalizedOrder.id } as any);

    expect(loggerSpy).toHaveBeenCalledWith(
      `Order ${finalizedOrder.id} already finalized with status ${finalizedOrder.status}`
    );
    expect(orderRepository.update).not.toHaveBeenCalled();
  });

  it('should confirm order if status is QUALIFIED', async () => {
    const order = { ...mockOrder, status: OrderStatus.QUALIFIED } as Order;
    orderRepository.findById.mockResolvedValueOnce(order);
    const confirmSpy = jest.spyOn(useCase as any, 'confirmOrder');

    await useCase.execute({ orderId: order.id } as any);

    expect(confirmSpy).toHaveBeenCalledWith(order);
    expect(order.status).toBe(OrderStatus.CONFIRMED);
    expect(orderRepository.update).toHaveBeenCalledWith(order);
  });

  it('should set status to RESERVED if order is not QUALIFIED', async () => {
    const order = { ...mockOrder, status: OrderStatus.RESERVED } as Order;
    orderRepository.findById.mockResolvedValueOnce(order);

    await useCase.execute({ orderId: order.id } as any);

    expect(order.status).toBe(OrderStatus.RESERVED);
    expect(orderRepository.update).toHaveBeenCalledWith(order);
  });

  it('should set reservedAt date', async () => {
    const order = { ...mockOrder, status: OrderStatus.RESERVED } as Order;
    orderRepository.findById.mockResolvedValueOnce(order);

    const before = new Date();
    await useCase.execute({ orderId: order.id } as any);
    const after = new Date();

    expect(order.reservedAt).toBeInstanceOf(Date);
    expect(order.reservedAt?.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(order.reservedAt?.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
