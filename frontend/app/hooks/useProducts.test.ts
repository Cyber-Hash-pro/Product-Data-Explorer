/**
 * useProducts Hook Tests
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';
import { productApi } from '../lib/api';
import type { Product } from '../lib/types';

// Mock the API module
jest.mock('../lib/api', () => ({
  productApi: {
    getProducts: jest.fn(),
    getStats: jest.fn(),
    deleteProduct: jest.fn(),
  },
}));

const mockProductApi = productApi as jest.Mocked<typeof productApi>;

describe('useProducts Hook', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      sourceId: 'book-1',
      title: 'Book 1',
      author: 'Author 1',
      price: 9.99,
      imageUrl: null,
      sourceUrl: 'http://example.com/1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      details: null,
    },
    {
      id: '2',
      sourceId: 'book-2',
      title: 'Book 2',
      author: 'Author 2',
      price: 14.99,
      imageUrl: null,
      sourceUrl: 'http://example.com/2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      details: null,
    },
  ];

  const mockStats = {
    totalProducts: 2,
    avgPrice: 12.49,
    minPrice: 9.99,
    maxPrice: 14.99,
    totalAuthors: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockProductApi.getProducts.mockResolvedValue({
      products: mockProducts,
      total: 2,
      page: 1,
      limit: 20,
    });
    mockProductApi.getStats.mockResolvedValue(mockStats);
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  it('should fetch products on mount', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
    });

    expect(mockProductApi.getProducts).toHaveBeenCalled();
  });

  it('should fetch stats on mount', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.stats).not.toBeNull();
    });

    expect(mockProductApi.getStats).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    const errorMessage = 'API Error';
    mockProductApi.getProducts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should refresh products', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCallCount = mockProductApi.getProducts.mock.calls.length;

    await act(async () => {
      await result.current.refresh();
    });

    expect(mockProductApi.getProducts.mock.calls.length).toBeGreaterThan(initialCallCount);
  });
});
