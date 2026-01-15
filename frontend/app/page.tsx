/**
 * Home Page
 * Main application page with product listing and scraping functionality
 */

'use client';

import React from 'react';
import { useProducts } from './hooks/useProducts';
import {
  Header,
  ScraperForm,
  ProductFilters,
  ProductGrid,
  ProductModal,
} from './components';
import type { Product } from './lib/types';

export default function Home() {
  const {
    products,
    stats,
    selectedProduct,
    loading,
    filters,
    updateFilter,
    clearFilters,
    selectProduct,
    refresh,
  } = useProducts();

  // Handle product click
  const handleProductClick = (product: Product) => {
    selectProduct(product);
  };

  // Handle modal close
  const handleModalClose = () => {
    selectProduct(null);
  };

  // Handle scrape complete
  const handleScrapeComplete = () => {
    refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Stats */}
      <Header stats={stats} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scraper Form */}
        <ScraperForm onScrapeComplete={handleScrapeComplete} />

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {/* Products Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          onProductClick={handleProductClick}
          onClearFilters={clearFilters}
        />
      </main>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={handleModalClose} />
    </div>
  );
}
