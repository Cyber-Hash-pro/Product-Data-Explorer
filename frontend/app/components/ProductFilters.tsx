/**
 * ProductFilters Component
 * Search and filter controls for products
 */

'use client';

import React from 'react';
import type { ProductFilters as Filters } from '../lib/types';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = filters.search || filters.minPrice || filters.maxPrice;

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 animate-slideUp stagger-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Search Products
          </label>
          <div className="relative group">
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search by title or author..."
              className="w-full px-4 py-3 pl-11 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder-zinc-500 group-hover:border-zinc-600"
            />
            <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Min Price (£)
          </label>
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder-zinc-500 hover:border-zinc-600"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Max Price (£)
          </label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            placeholder="999"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder-zinc-500 hover:border-zinc-600"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => onFilterChange('sortBy', e.target.value as Filters['sortBy'])}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 hover:border-zinc-600 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
          >
            <option value="createdAt">Date Added</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Order
          </label>
          <select
            value={filters.sortOrder || 'desc'}
            onChange={(e) => onFilterChange('sortOrder', e.target.value as Filters['sortOrder'])}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 hover:border-zinc-600 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="md:col-span-2 flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-6 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700/50 hover:border-zinc-600 group"
          >
            <CloseIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2 animate-fadeIn">
          {filters.search && (
            <FilterTag label={`Search: ${filters.search}`} color="indigo" />
          )}
          {filters.minPrice && (
            <FilterTag label={`Min: £${filters.minPrice}`} color="purple" />
          )}
          {filters.maxPrice && (
            <FilterTag label={`Max: £${filters.maxPrice}`} color="purple" />
          )}
        </div>
      )}
    </div>
  );
}

// Filter Tag Sub-component
function FilterTag({ label, color }: { label: string; color: 'indigo' | 'purple' }) {
  const colorClasses = {
    indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    purple: 'bg-[#2D2D2D]/20 text-zinc-300 border-[#2D2D2D]/30',
  };

  return (
    <span className={`${colorClasses[color]} px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm`}>
      {label}
    </span>
  );
}

// Icon Components
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
