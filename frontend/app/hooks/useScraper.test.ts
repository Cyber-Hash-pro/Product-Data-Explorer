/**
 * useScraper Hook Tests
 */

import { renderHook, act } from '@testing-library/react';
import { useScraper } from './useScraper';
import { scraperApi } from '../lib/api';
import type { ScrapeResponse } from '../lib/types';

// Mock the API module
jest.mock('../lib/api', () => ({
  scraperApi: {
    scrapeProduct: jest.fn(),
  },
}));

const mockScraperApi = scraperApi as jest.Mocked<typeof scraperApi>;

describe('useScraper Hook', () => {
  const createMockProduct = (overrides = {}): ScrapeResponse => ({
    id: '1',
    sourceId: 'test-1',
    title: 'Test Product',
    author: 'Author',
    price: 15.99,
    imageUrl: null,
    sourceUrl: 'http://example.com/product',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: null,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with idle state', () => {
    const { result } = renderHook(() => useScraper());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.lastScraped).toBeNull();
  });

  it('should scrape a single URL', async () => {
    const mockResult = createMockProduct({ title: 'Scraped Product' });

    mockScraperApi.scrapeProduct.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useScraper());

    await act(async () => {
      await result.current.scrapeProduct('http://example.com/product');
    });

    expect(mockScraperApi.scrapeProduct).toHaveBeenCalledWith({ url: 'http://example.com/product' });
    expect(result.current.lastScraped).toEqual(mockResult);
    expect(result.current.loading).toBe(false);
  });

  it('should set loading state during scraping', async () => {
    mockScraperApi.scrapeProduct.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(createMockProduct()), 100))
    );

    const { result } = renderHook(() => useScraper());

    act(() => {
      result.current.scrapeProduct('http://example.com');
    });

    expect(result.current.loading).toBe(true);
  });

  it('should handle scraping errors', async () => {
    const errorMessage = 'Failed to scrape';
    mockScraperApi.scrapeProduct.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useScraper());

    await act(async () => {
      await result.current.scrapeProduct('http://invalid-url.com');
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('should reset state', async () => {
    mockScraperApi.scrapeProduct.mockResolvedValue(createMockProduct());

    const { result } = renderHook(() => useScraper());

    await act(async () => {
      await result.current.scrapeProduct('http://example.com');
    });

    expect(result.current.lastScraped).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.lastScraped).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should clear messages', async () => {
    mockScraperApi.scrapeProduct.mockResolvedValue(createMockProduct());

    const { result } = renderHook(() => useScraper());

    await act(async () => {
      await result.current.scrapeProduct('http://example.com');
    });

    expect(result.current.success).toBeTruthy();

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.success).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
