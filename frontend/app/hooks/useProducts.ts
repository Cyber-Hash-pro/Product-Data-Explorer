/**
 * useProducts Hook
 * Custom hook for managing product data and state
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { productApi } from '../lib/api';
import type { Product, ProductFilters, ProductStats } from '../lib/types';

interface UseProductsOptions {
  autoFetch?: boolean;
  initialFilters?: ProductFilters;
}

interface UseProductsReturn {
  // Data
  products: Product[];
  stats: ProductStats | null;
  selectedProduct: Product | null;

  // State
  loading: boolean;
  error: string | null;

  // Filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  clearFilters: () => void;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchStats: () => Promise<void>;
  selectProduct: (product: Product | null) => void;
  deleteProduct: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const defaultFilters: ProductFilters = {
  search: '',
  minPrice: '',
  maxPrice: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { autoFetch = true, initialFilters = {} } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<ProductFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getProducts(filters);
      setProducts(response.products || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await productApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id: string) => {
    try {
      await productApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
      await fetchStats();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      throw new Error(message);
    }
  }, [selectedProduct, fetchStats]);

  // Refresh all data
  const refresh = useCallback(async () => {
    await Promise.all([fetchProducts(), fetchStats()]);
  }, [fetchProducts, fetchStats]);

  // Update single filter
  const updateFilter = useCallback(<K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  // Set all filters at once
  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Select product
  const selectProduct = useCallback((product: Product | null) => {
    setSelectedProduct(product);
  }, []);

  // Auto-fetch on mount and filter changes
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  // Fetch stats on mount
  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [autoFetch, fetchStats]);

  return {
    products,
    stats,
    selectedProduct,
    loading,
    error,
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    fetchProducts,
    fetchStats,
    selectProduct,
    deleteProduct,
    refresh,
  };
}
