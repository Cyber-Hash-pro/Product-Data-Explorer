/**
 * Header Component
 * Main navigation and stats display
 */

'use client';

import React from 'react';
import type { ProductStats } from '../lib/types';

interface HeaderProps {
  stats: ProductStats | null;
}

export default function Header({ stats }: HeaderProps) {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Product Explorer
              </h1>
              <p className="text-gray-600">Discover and manage products with ease</p>
            </div>
          </div>

          {/* Stats Display */}
          {stats && (
            <div className="hidden md:flex items-center gap-6">
              <StatCard label="Total Products" value={stats.totalProducts} icon="📦" />
              <StatCard label="Avg Price" value={`£${stats.avgPrice.toFixed(2)}`} icon="💰" />
              <StatCard label="Authors" value={stats.totalAuthors} icon="✍️" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Stats Card Sub-component
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}
