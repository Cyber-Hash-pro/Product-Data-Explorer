/**
 * Type Definitions
 * Centralized TypeScript interfaces and types
 */

// Product Details - extended metadata about a product
export interface ProductDetails {
  description: string | null;
  isbn: string | null;
  publisher: string | null;
  publicationDate: string | null;
  format: string | null;
  pages: number | null;
  language: string | null;
  dimensions: string | null;
  rating: number | null;
  reviewCount: number | null;
  availability: string | null;
}

// Main Product interface
export interface Product {
  id: string;
  sourceId: string;
  title: string;
  author: string | null;
  price: number;
  imageUrl: string | null;
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
  details: ProductDetails | null;
}

// Product list response from API
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Product statistics response
export interface ProductStats {
  totalProducts: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  totalAuthors: number;
}

// Filter parameters for product queries
export interface ProductFilters {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  author?: string;
  sortBy?: 'createdAt' | 'price' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Scrape request payload
export interface ScrapeRequest {
  url: string;
}

// Scrape response
export interface ScrapeResponse extends Product {
  message?: string;
}

// API Error response
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}
