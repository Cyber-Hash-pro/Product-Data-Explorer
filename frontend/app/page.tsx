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
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Stats */}
        <Header stats={stats} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Scraper Form */}
          <div className="animate-slideUp">
            <ScraperForm onScrapeComplete={handleScrapeComplete} />
          </div>

          {/* Filters */}
          <div className="animate-slideUp stagger-1">
            <ProductFilters
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="animate-fadeIn stagger-2">
            <ProductGrid
              products={products}
              loading={loading}
              onProductClick={handleProductClick}
              onClearFilters={clearFilters}
            />
          </div>
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={handleModalClose} />
    </div>
  );
}
