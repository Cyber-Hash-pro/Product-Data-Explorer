/**
 * Application Configuration
 * Centralized configuration for API URLs and other settings
 */

// Backend API URL - uses environment variable or defaults to localhost:3000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://product-data-explorer-qom4.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Product endpoints
  products: {
    list: `${API_BASE_URL}/products`,
    stats: `${API_BASE_URL}/products/stats`,
    getById: (id: string) => `${API_BASE_URL}/products/${id}`,
    delete: (id: string) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
  },
  // Scraper endpoints
  scrape: {
    product: `${API_BASE_URL}/scrape/product`,
  },
} as const;

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Pagination defaults
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// Sort options
export const SORT_OPTIONS = {
  fields: ['createdAt', 'price', 'title'] as const,
  orders: ['asc', 'desc'] as const,
  defaultField: 'createdAt' as const,
  defaultOrder: 'desc' as const,
} as const;
