/**
 * Product Crawler Unit Tests
 */

import axios from 'axios';
import { scrapeProductPage } from './product.crawler';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Product Crawler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should scrape product data from HTML', async () => {
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Book by Test Author - World of Books</title>
          <meta property="og:title" content="Test Book by Test Author" />
        </head>
        <body>
          <h1>Test Book by Test Author</h1>
          <span class="price">£9.99</span>
          <img class="product__media" src="//example.com/image.jpg" />
          <div class="product__description">This is a great book about testing.</div>
          <div class="product-details">
            ISBN: 1234567890
            Publisher: Test Publisher
            Pages: 200
            Language: English
          </div>
        </body>
      </html>
    `;

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockHtml,
    });

    const result = await scrapeProductPage(
      'http://example.com/products/test-book-1234567890',
    );

    expect(result).toBeDefined();
    expect(result.title).toBeDefined();
    expect(result.sourceId).toBe('test-book-1234567890');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://example.com/products/test-book-1234567890',
      expect.any(Object),
    );
  });

  it('should extract price correctly', async () => {
    const mockHtml = `
      <html>
        <head><title>Book Title</title></head>
        <body>
          <h1>Book Title</h1>
          <span class="price">£15.50</span>
        </body>
      </html>
    `;

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockHtml,
    });

    const result = await scrapeProductPage(
      'http://example.com/products/book-123',
    );

    expect(result.price).toBe(15.5);
  });

  it('should handle missing price gracefully', async () => {
    const mockHtml = `
      <html>
        <head><title>Book Without Price</title></head>
        <body>
          <h1>Book Without Price</h1>
        </body>
      </html>
    `;

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockHtml,
    });

    const result = await scrapeProductPage(
      'http://example.com/products/no-price-123',
    );

    expect(result.price).toBeNull();
  });

  it('should throw error on network failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(
      scrapeProductPage('http://example.com/products/error'),
    ).rejects.toThrow();
  });

  it('should extract author from title', async () => {
    const mockHtml = `
      <html>
        <head><title>The Great Book by John Doe</title></head>
        <body>
          <h1>The Great Book by John Doe</h1>
        </body>
      </html>
    `;

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockHtml,
    });

    const result = await scrapeProductPage(
      'http://example.com/products/great-book-789',
    );

    expect(result.author).toContain('John Doe');
  });
});
