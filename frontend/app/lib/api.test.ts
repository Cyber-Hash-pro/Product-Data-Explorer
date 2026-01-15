/**
 * API Configuration Tests
 */

import { API_ENDPOINTS } from './config';
import { productApi, scraperApi } from './api';

// Reset fetch mock before each test
beforeEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

describe('API Configuration', () => {
  describe('API_ENDPOINTS', () => {
    it('should have products endpoints', () => {
      expect(API_ENDPOINTS.products.list).toBeDefined();
      expect(typeof API_ENDPOINTS.products.getById).toBe('function');
      expect(API_ENDPOINTS.products.stats).toBeDefined();
    });

    it('should have scrape endpoint', () => {
      expect(API_ENDPOINTS.scrape).toBeDefined();
    });
  });

  describe('productApi', () => {
    it('should fetch products', async () => {
      const mockResponse = {
        products: [{ id: '1', title: 'Test' }],
        pagination: { total: 1 },
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await productApi.getProducts();

      expect(global.fetch).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should fetch product by id', async () => {
      const mockProduct = { id: '1', title: 'Test Product' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await productApi.getProductById('1');

      expect(global.fetch).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
    });

    it('should fetch stats', async () => {
      const mockStats = { totalProducts: 10, avgPrice: 15.5 };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockStats),
      });

      const result = await productApi.getStats();

      expect(global.fetch).toHaveBeenCalled();
      expect(result).toEqual(mockStats);
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ message: 'Error' }),
      });

      await expect(productApi.getProducts()).rejects.toBeDefined();
    });
  });

  describe('scraperApi', () => {
    it('should scrape a single URL', async () => {
      const mockResult = { id: '1', title: 'Scraped Product' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResult),
      });

      const result = await scraperApi.scrapeProduct({ url: 'http://example.com' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: expect.any(String),
        })
      );
      expect(result).toEqual(mockResult);
    });
  });
});
