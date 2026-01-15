/**
 * Product Controller Unit Tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

// Mock ProductService
const mockProductService = {
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getStats: jest.fn(),
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: typeof mockProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get(ProductService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return products array', async () => {
      const mockResult = {
        products: [
          {
            id: '1',
            title: 'Test Book',
            author: 'Test Author',
            price: 9.99,
          },
        ],
        pagination: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      };

      service.getAllProducts.mockResolvedValue(mockResult);

      const result = await controller.getAll();

      expect(result).toEqual(mockResult);
      expect(service.getAllProducts).toHaveBeenCalled();
    });

    it('should pass query parameters to service', async () => {
      service.getAllProducts.mockResolvedValue({
        products: [],
        pagination: {},
      });

      await controller.getAll(
        'test',
        '5',
        '20',
        undefined,
        undefined,
        undefined,
        'price',
        'asc',
      );

      expect(service.getAllProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'test',
          minPrice: 5,
          maxPrice: 20,
          sortBy: 'price',
          sortOrder: 'asc',
        }),
      );
    });
  });

  describe('getById', () => {
    it('should return a single product', async () => {
      const mockProduct = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        price: 9.99,
      };

      service.getProductById.mockResolvedValue(mockProduct);

      const result = await controller.getById('1');

      expect(result).toEqual(mockProduct);
      expect(service.getProductById).toHaveBeenCalledWith('1');
    });
  });

  describe('getStats', () => {
    it('should return product statistics', async () => {
      const mockStats = {
        totalProducts: 10,
        avgPrice: 15.5,
        minPrice: 5.0,
        maxPrice: 25.0,
        totalAuthors: 5,
      };

      service.getStats.mockResolvedValue(mockStats);

      const result = await controller.getStats();

      expect(result).toEqual(mockStats);
      expect(service.getStats).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProduct = {
        id: '1',
        sourceId: 'new-product',
        title: 'New Book',
        author: 'Author',
        price: 10.99,
        sourceUrl: 'http://example.com',
      };

      service.createProduct.mockResolvedValue(mockProduct);

      const body = {
        sourceId: 'new-product',
        title: 'New Book',
        author: 'Author',
        price: 10.99,
        sourceUrl: 'http://example.com',
      };

      const result = await controller.create(body);

      expect(result).toEqual(mockProduct);
      expect(service.createProduct).toHaveBeenCalledWith(body);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      service.deleteProduct.mockResolvedValue({ id: '1', deleted: true });

      const result = await controller.delete('1');

      expect(service.deleteProduct).toHaveBeenCalledWith('1');
    });
  });
});
