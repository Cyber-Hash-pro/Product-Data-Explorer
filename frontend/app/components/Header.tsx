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
    <header className="glass-card border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-[#2D2D2D] to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-indigo-500 via-[#2D2D2D] to-cyan-500 p-3 rounded-xl">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Product Explorer
              </h1>
              <p className="text-zinc-500 text-sm">Discover amazing products</p>
            </div>
          </div>

          {/* Stats Display */}
          {stats && (
            <div className="hidden md:flex items-center gap-2">
              <StatCard
                label="Products"
                value={stats.totalProducts}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                }
                color="indigo"
              />
              <StatCard
                label="Avg Price"
                value={`£${stats.avgPrice.toFixed(2)}`}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="purple"
              />
              <StatCard
                label="Authors"
                value={stats.totalAuthors}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                color="cyan"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Stats Card Sub-component
function StatCard({
  label,
  value,
  icon,
  color
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'indigo' | 'purple' | 'cyan';
}) {
  const colorClasses = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400',
    purple: 'from-[#2D2D2D]/20 to-[#2D2D2D]/5 border-[#2D2D2D]/20 text-zinc-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r ${colorClasses[color]} border backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
      <div className={colorClasses[color]}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-zinc-100">{value}</div>
        <div className="text-xs text-zinc-500">{label}</div>
      </div>
    </div>
  );
}
