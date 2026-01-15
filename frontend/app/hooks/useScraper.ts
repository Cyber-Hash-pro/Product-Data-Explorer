/**
 * useScraper Hook
 * Custom hook for managing product scraping
 */

'use client';

import { useState, useCallback } from 'react';
import { scraperApi } from '../lib/api';
import type { ScrapeResponse } from '../lib/types';

interface UseScraperReturn {
  // State
  loading: boolean;
  error: string | null;
  success: string | null;
  lastScraped: ScrapeResponse | null;

  // Actions
  scrapeProduct: (url: string) => Promise<ScrapeResponse | null>;
  clearMessages: () => void;
  reset: () => void;
}

export function useScraper(): UseScraperReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lastScraped, setLastScraped] = useState<ScrapeResponse | null>(null);

  const scrapeProduct = useCallback(async (url: string): Promise<ScrapeResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await scraperApi.scrapeProduct({ url });
      setLastScraped(result);
      setSuccess(`Successfully scraped: ${result.title}`);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to scrape product';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(null);
    setLastScraped(null);
  }, []);

  return {
    loading,
    error,
    success,
    lastScraped,
    scrapeProduct,
    clearMessages,
    reset,
  };
}
