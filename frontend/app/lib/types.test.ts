/**
 * Types Tests - Ensure type definitions are correct
 */

import type {
  Product,
  ProductDetails,
  ProductFilters,
  ProductStats,
  ProductListResponse,
} from './types';

describe('Type Definitions', () => {
  describe('Product', () => {
    it('should match expected product structure', () => {
      const product: Product = {
        id: '1',
        sourceId: 'test-123',
        title: 'Test Book',
        author: 'Test Author',
        price: 9.99,
        imageUrl: 'http://example.com/image.jpg',
        sourceUrl: 'http://example.com/product',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        details: null,
      };

      expect(product.id).toBe('1');
      expect(product.title).toBe('Test Book');
      expect(typeof product.price).toBe('number');
    });

    it('should allow null values for optional fields', () => {
      const product: Product = {
        id: '1',
        sourceId: 'test-123',
        title: 'Test Book',
        author: null,
        price: 0,
        imageUrl: null,
        sourceUrl: 'http://example.com/product',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        details: null,
      };

      expect(product.author).toBeNull();
      expect(product.imageUrl).toBeNull();
    });
  });

  describe('ProductDetails', () => {
    it('should have expected detail fields', () => {
      const details: ProductDetails = {
        description: 'A great book',
        isbn: '1234567890',
        publisher: 'Test Publisher',
        publicationDate: '2024-01-01',
        format: 'Paperback',
        pages: 200,
        language: 'English',
        dimensions: '5x8',
        rating: 4.5,
        reviewCount: 100,
        availability: 'In Stock',
      };

      expect(details.isbn).toBe('1234567890');
      expect(details.pages).toBe(200);
    });
  });

  describe('ProductFilters', () => {
    it('should support all filter options', () => {
      const filters: ProductFilters = {
        search: 'test',
        minPrice: '5',
        maxPrice: '50',
        sortBy: 'price',
        sortOrder: 'asc',
      };

      expect(filters.search).toBe('test');
      expect(filters.minPrice).toBe('5');
      expect(filters.sortOrder).toBe('asc');
    });
  });

  describe('ProductStats', () => {
    it('should have expected stats fields', () => {
      const stats: ProductStats = {
        totalProducts: 100,
        avgPrice: 15.5,
        minPrice: 5.0,
        maxPrice: 50.0,
        totalAuthors: 25,
      };

      expect(stats.totalProducts).toBe(100);
      expect(stats.avgPrice).toBe(15.5);
    });
  });

  describe('ProductListResponse', () => {
    it('should contain products and pagination info', () => {
      const response: ProductListResponse = {
        products: [
          {
            id: '1',
            sourceId: 'test',
            title: 'Test',
            author: null,
            price: 10,
            imageUrl: null,
            sourceUrl: 'http://test.com',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
            details: null,
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
      };

      expect(response.products).toHaveLength(1);
      expect(response.total).toBe(1);
    });
  });
});
