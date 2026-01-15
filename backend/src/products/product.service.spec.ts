/**
 * Product Service Unit Tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma.service';

// Mock PrismaService
const mockPrismaService = {
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductService', () => {
  let service: ProductService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get(PrismaService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return products with pagination', async () => {
      const mockProducts = [
        {
          id: '1',
          sourceId: 'test-1',
          title: 'Test Book',
          author: 'Test Author',
          price: 9.99,
          imageUrl: 'http://example.com/image.jpg',
          sourceUrl: 'http://example.com/product/1',
          createdAt: new Date(),
          updatedAt: new Date(),
          details: null,
        },
      ];

      prisma.product.findMany.mockResolvedValue(mockProducts);
      prisma.product.count.mockResolvedValue(1);

      const result = await service.getAllProducts();

      expect(result.products).toEqual(mockProducts);
      expect(result.pagination.total).toBe(1);
      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(prisma.product.count).toHaveBeenCalled();
    });

    it('should apply search filter', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.getAllProducts({ search: 'Test' });

      expect(prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
        }),
      );
    });

    it('should apply price filters', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.getAllProducts({ minPrice: 5, maxPrice: 20 });

      expect(prisma.product.findMany).toHaveBeenCalled();
    });

    it('should handle pagination', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(100);

      const result = await service.getAllProducts({ page: 2, limit: 10 });

      expect(result.pagination.page).toBe(2);
      expect(result.pagination.limit).toBe(10);
      expect(prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        }),
      );
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const mockProduct = {
        id: '1',
        sourceId: 'test-1',
        title: 'Test Book',
        author: 'Test Author',
        price: 9.99,
        imageUrl: null,
        sourceUrl: 'http://example.com/product/1',
        createdAt: new Date(),
        updatedAt: new Date(),
        details: null,
      };

      prisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.getProductById('1');

      expect(result).toEqual(mockProduct);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { details: true },
      });
    });

    it('should return null for non-existent product', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      const result = await service.getProductById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        sourceId: 'new-product',
        title: 'New Book',
        author: 'New Author',
        price: 15.99,
        imageUrl: 'http://example.com/new-image.jpg',
        sourceUrl: 'http://example.com/product/new',
      };

      const createdProduct = {
        id: '2',
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        details: null,
      };

      prisma.product.upsert.mockResolvedValue(createdProduct);

      const result = await service.createProduct(productData);

      expect(result).toEqual(createdProduct);
      expect(prisma.product.upsert).toHaveBeenCalled();
    });

    it('should create product with details', async () => {
      const productData = {
        sourceId: 'product-with-details',
        title: 'Book with Details',
        author: 'Author Name',
        price: 12.99,
        imageUrl: null,
        sourceUrl: 'http://example.com/product/details',
        details: {
          description: 'A great book',
          isbn: '1234567890',
          publisher: 'Test Publisher',
        },
      };

      prisma.product.upsert.mockResolvedValue({
        id: '3',
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await service.createProduct(productData);

      expect(prisma.product.upsert).toHaveBeenCalled();
    });
  });
});
