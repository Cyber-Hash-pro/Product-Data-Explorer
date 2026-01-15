/**
 * ProductGrid Component
 * Grid display for products with loading and empty states
 */

'use client';

import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../lib/types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (product: Product) => void;
  onClearFilters: () => void;
}

export default function ProductGrid({
  products,
  loading,
  onProductClick,
  onClearFilters,
}: ProductGridProps) {
  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          {/* Animated Loading Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-[#2D2D2D] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-500 border-l-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-[#2D2D2D] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-zinc-400 font-medium animate-pulse">Loading products...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#2D2D2D] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 w-24 h-24 rounded-full flex items-center justify-center border border-zinc-700/50">
              <svg className="w-12 h-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-zinc-100 mb-2">No Products Found</h3>
          <p className="text-zinc-500 mb-6">Try adjusting your filters or add a new product using the form above.</p>
          <button
            onClick={onClearFilters}
            className="group relative px-6 py-3 overflow-hidden rounded-xl font-semibold transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#2D2D2D] transition-transform duration-300 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-[#2D2D2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative text-white flex items-center gap-2">
              Clear All Filters
              <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Products Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-slideUp"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard
            product={product}
            onClick={() => onProductClick(product)}
          />
        </div>
      ))}
    </div>
  );
}
