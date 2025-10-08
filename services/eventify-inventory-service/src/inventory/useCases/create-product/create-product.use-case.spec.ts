import { CreateProductUseCase } from './create-product.use-case';
import { ProductRepository } from '../../repository/product.repository';
import { CreateProductRequest } from '../../contracts/create-product.contract';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = {
      findBySku: jest.fn(),
      create: jest.fn(),
    } as any;

    useCase = new CreateProductUseCase(productRepository);
  });

  const request: CreateProductRequest = {
    sku: 'sku-test',
    name: 'Product',
    price: 100,
    stock: 10,
    description: 'desc',
  };

  it('should call findBySku with correct SKU', async () => {
    productRepository.findBySku.mockResolvedValue(null);
    productRepository.create.mockResolvedValue({ id: 'id1' } as any);

    await useCase.execute(request);

    expect(productRepository.findBySku).toHaveBeenCalledWith('sku-test');
  });

  it('should propagate error if findBySku throws', async () => {
    productRepository.findBySku.mockRejectedValue(new Error('DB error'));

    await expect(useCase.execute(request)).rejects.toThrow('DB error');
  });

  it('should throw if product with same SKU already exists', async () => {
    productRepository.findBySku.mockResolvedValue({ id: 'existing' } as any);

    await expect(useCase.execute(request)).rejects.toThrow(
      'Product with this SKU already exists',
    );

    expect(productRepository.create).not.toHaveBeenCalled();
  });

  it('should propagate error if create throws', async () => {
    productRepository.findBySku.mockResolvedValue(null);
    productRepository.create.mockRejectedValue(new Error('Create error'));

    await expect(useCase.execute(request)).rejects.toThrow('Create error');
  });

  it('should create product successfully if SKU is unique', async () => {
    productRepository.findBySku.mockResolvedValue(null);
    productRepository.create.mockResolvedValue({
      id: 'id1',
      ...request,
    } as any);

    const result = await useCase.execute(request);

    expect(productRepository.create).toHaveBeenCalledWith(request);
    expect(result).toEqual('id1');
  });
});
