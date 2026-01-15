'use client';

import React, { useState } from 'react';
import { useScraper } from '../hooks/useScraper';

interface ScraperFormProps {
  onScrapeComplete: () => void;
}

export default function ScraperForm({ onScrapeComplete }: ScraperFormProps) {
  const [url, setUrl] = useState('');
  const { loading, error, success, scrapeProduct, clearMessages } = useScraper();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await scrapeProduct(url);

    if (result) {
      setUrl('');
      setTimeout(() => {
        onScrapeComplete();
        clearMessages();
      }, 2000);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 mb-8 animate-slideUp stagger-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-60"></div>
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Add New Product</h2>
          <p className="text-zinc-500">Scrape product details from a URL</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-zinc-400 mb-2">
            Product URL
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.worldofbooks.com/..."
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-zinc-600"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl"></div>
            </div>
            <button
              type="submit"
              disabled={loading || !url}
              className="group relative px-8 py-3 overflow-hidden rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 group-hover:scale-105 group-disabled:scale-100"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300"></div>
              <span className="relative text-white flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Scraping...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Scrape Product
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="relative overflow-hidden bg-red-500/10 border border-red-500/30 p-4 rounded-xl animate-slideIn">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-1.5 bg-red-500/20 rounded-lg">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="relative overflow-hidden bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl animate-slideIn">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-emerald-300 font-medium">{success}</p>
            </div>
          </div>
        )}

        <div className="relative overflow-hidden bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
          <div className="relative flex items-start gap-3">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg mt-0.5">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-zinc-400">
              <p className="font-medium text-zinc-300 mb-1">Tip:</p>
              <p>Paste a product URL from World of Books or similar sites. The scraper will automatically extract product details including title, author, price, and more.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
