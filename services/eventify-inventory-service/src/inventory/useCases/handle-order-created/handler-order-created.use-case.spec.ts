import { HandleOrderCreatedUseCase } from '../../useCases/handle-order-created/handler-order-created.use-case';
import { ProductService } from '../../services/product.service';
import { ReservationRepository } from '../../repository/product-reservation.repository';
import {
  KafkaService,
  ORDER_RESERVED_EVENT,
  ORDER_CANCELED_EVENT,
} from '@vilasboas1407/kafka';

describe('HandleOrderCreatedUseCase', () => {
  let useCase: HandleOrderCreatedUseCase;
  let productService: jest.Mocked<ProductService>;
  let reservationRepo: jest.Mocked<ReservationRepository>;
  let kafkaService: jest.Mocked<KafkaService>;

  beforeEach(() => {
    productService = { findByIds: jest.fn(), updateStock: jest.fn() } as any;
    reservationRepo = { create: jest.fn() } as any;
    kafkaService = { sendMessage: jest.fn() } as any;

    useCase = new HandleOrderCreatedUseCase(
      productService,
      reservationRepo,
      kafkaService,
    );
  });

  it('creates reservations and sends ORDER_RESERVED_EVENT on success', async () => {
    const message = {
      orderId: 'order-1',
      items: [
        { productId: 'p1', count: 2 },
        { productId: 'p2', count: 1 },
      ],
    } as any;

    productService.findByIds.mockResolvedValue([
      { id: 'p1', stock: 5, name: 'P1' },
      { id: 'p2', stock: 3, name: 'P2' },
    ] as any);

    await useCase.execute(message);

    expect(reservationRepo.create).toHaveBeenCalledTimes(2);
    expect(productService.updateStock).toHaveBeenCalledTimes(2);
    expect(kafkaService.sendMessage).toHaveBeenCalledWith(
      ORDER_RESERVED_EVENT,
      expect.objectContaining({ orderId: 'order-1' }),
    );
  });

  it('sends ORDER_CANCELED_EVENT when a product is not found', async () => {
    const message = {
      orderId: 'order-2',
      items: [{ productId: 'p1', count: 2 }],
    } as any;

    productService.findByIds.mockResolvedValue([] as any);

    await useCase.execute(message);

    expect(kafkaService.sendMessage).toHaveBeenCalledWith(
      ORDER_CANCELED_EVENT,
      expect.objectContaining({ orderId: 'order-2' }),
    );
    expect(reservationRepo.create).not.toHaveBeenCalled();
  });

  it('sends ORDER_CANCELED_EVENT when stock is insufficient', async () => {
    const message = {
      orderId: 'order-3',
      items: [{ productId: 'p1', count: 10 }],
    } as any;

    productService.findByIds.mockResolvedValue([
      { id: 'p1', stock: 5, name: 'P1' },
    ] as any);

    await useCase.execute(message);

    expect(kafkaService.sendMessage).toHaveBeenCalledWith(
      ORDER_CANCELED_EVENT,
      expect.objectContaining({ orderId: 'order-3' }),
    );
    expect(reservationRepo.create).not.toHaveBeenCalled();
  });

  it('sends ORDER_CANCELED_EVENT when repository create fails', async () => {
    const message = {
      orderId: 'order-4',
      items: [{ productId: 'p1', count: 1 }],
    } as any;

    productService.findByIds.mockResolvedValue([
      { id: 'p1', stock: 5, name: 'P1' },
    ] as any);
    reservationRepo.create.mockRejectedValue(new Error('db fail'));

    await useCase.execute(message);

    expect(kafkaService.sendMessage).toHaveBeenCalledWith(
      ORDER_CANCELED_EVENT,
      expect.objectContaining({ orderId: 'order-4' }),
    );
  });
});
