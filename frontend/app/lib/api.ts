/**
 * API Service
 * Centralized API calls with error handling
 */

import { API_ENDPOINTS, REQUEST_TIMEOUT } from './config';
import type {
  Product,
  ProductListResponse,
  ProductStats,
  ProductFilters,
  ScrapeRequest,
  ScrapeResponse,
  ApiError,
} from './types';

/**
 * Custom fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Parse API error from response
 */
async function parseError(response: Response): Promise<ApiError> {
  try {
    const data = await response.json();
    return {
      statusCode: response.status,
      message: data.message || 'An error occurred',
      error: data.error,
    };
  } catch {
    return {
      statusCode: response.status,
      message: response.statusText || 'An error occurred',
    };
  }
}

/**
 * Product API methods
 */
export const productApi = {
  /**
   * Get all products with optional filters
   */
  async getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.author) params.append('author', filters.author);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const url = `${API_ENDPOINTS.products.list}?${params}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw await parseError(response);
    }

    return response.json();
  },

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await fetchWithTimeout(API_ENDPOINTS.products.getById(id));

    if (!response.ok) {
      throw await parseError(response);
    }

    return response.json();
  },

  /**
   * Get product statistics
   */
  async getStats(): Promise<ProductStats> {
    const response = await fetchWithTimeout(API_ENDPOINTS.products.stats);

    if (!response.ok) {
      throw await parseError(response);
    }

    return response.json();
  },

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    const response = await fetchWithTimeout(API_ENDPOINTS.products.delete(id), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw await parseError(response);
    }
  },
};

/**
 * Scraper API methods
 */
export const scraperApi = {
  /**
   * Scrape a product from URL
   */
  async scrapeProduct(request: ScrapeRequest): Promise<ScrapeResponse> {
    const response = await fetchWithTimeout(
      API_ENDPOINTS.scrape.product,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      },
      60000 // Longer timeout for scraping
    );

    if (!response.ok) {
      throw await parseError(response);
    }

    return response.json();
  },
};
