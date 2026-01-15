/**
 * Scrape Service Unit Tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeService } from './scrape.service';
import { ProductService } from '../products/product.service';

// Mock ProductService
const mockProductService = {
  createProduct: jest.fn(),
};

// Mock the scraper module
jest.mock('./crawlers/product.crawler', () => ({
  scrapeProductPage: jest.fn(),
}));

import { scrapeProductPage } from './crawlers/product.crawler';

describe('ScrapeService', () => {
  let service: ScrapeService;
  let productService: typeof mockProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScrapeService,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<ScrapeService>(ScrapeService);
    productService = module.get(ProductService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('scrapeProduct', () => {
    it('should scrape product and save to database', async () => {
      const mockScrapedData = {
        sourceId: 'test-product-123',
        title: 'Scraped Book Title',
        author: 'Scraped Author',
        price: 12.99,
        imageUrl: 'http://example.com/image.jpg',
        details: {
          description: 'A great book about testing',
          isbn: '1234567890123',
          publisher: 'Test Publisher',
        },
      };

      const mockSavedProduct = {
        id: '1',
        ...mockScrapedData,
        sourceUrl: 'http://example.com/product',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (scrapeProductPage as jest.Mock).mockResolvedValue(mockScrapedData);
      productService.createProduct.mockResolvedValue(mockSavedProduct);

      const url = 'http://example.com/product';
      const result = await service.scrapeProduct(url);

      expect(scrapeProductPage).toHaveBeenCalledWith(url);
      expect(productService.createProduct).toHaveBeenCalled();
      expect(result).toEqual(mockSavedProduct);
    });

    it('should throw error when scraping fails', async () => {
      (scrapeProductPage as jest.Mock).mockRejectedValue(
        new Error('Failed to scrape'),
      );

      await expect(
        service.scrapeProduct('http://invalid-url.com'),
      ).rejects.toThrow('Failed to scrape');
    });
  });
});
