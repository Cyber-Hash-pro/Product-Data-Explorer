import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedProduct {
  sourceId: string;
  title: string;
  author: string | null;
  price: number | null;
  imageUrl: string | null;
  details?: {
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
  };
}

export async function scrapeProductPage(url: string): Promise<ScrapedProduct> {
  console.log(`[Scraper] Starting to scrape: ${url}`);

  try {
    // Fetch the page with realistic headers
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      timeout: 15000,
      maxRedirects: 5,
    });

    console.log(
      `[Scraper] Page fetched successfully, status: ${response.status}`,
    );

    const $ = cheerio.load(response.data);

    // Extract title from h1
    const h1Element = $('h1').first();
    const rawTitle = h1Element.text();
    const title = rawTitle.split('\n')[0]?.trim() || 'Unknown Title';
    console.log(`[Scraper] Title: ${title}`);

    // Extract author
    let author: string | null = null;
    // Try finding author link in h1
    const authorLink = h1Element.find('a').first();
    if (authorLink.length) {
      author = authorLink.text().trim();
    }
    // Fallback: "by Author" pattern
    if (!author && rawTitle.toLowerCase().includes('by')) {
      const parts = rawTitle.split(/by/i);
      author = parts[1]?.split('\n')[0]?.trim() || null;
    }
    console.log(`[Scraper] Author: ${author}`);

    // Extract price - look for £ symbol
    let price: number | null = null;
    $('[class*="price"], .price, span').each((_, el) => {
      const text = $(el).text();
      if (text.includes('£') && !price) {
        const match = text.match(/£([\d,.]+)/);
        if (match) {
          price = parseFloat(match[1].replace(',', ''));
        }
      }
    });
    console.log(`[Scraper] Price: ${price}`);

    // Extract image URL
    let imageUrl: string | null = null;
    const imgSelectors = [
      '.product__media img',
      '.product-image img',
      '[class*="product"] img',
      'main img',
      'img[src*="product"]',
    ];
    for (const selector of imgSelectors) {
      const img = $(selector).first();
      if (img.length) {
        imageUrl = img.attr('src') || img.attr('data-src') || null;
        if (imageUrl) break;
      }
    }
    // Normalize protocol-relative URLs
    if (imageUrl?.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }
    console.log(`[Scraper] Image URL: ${imageUrl}`);

    // Extract description
    let description: string | null = null;
    const descSelectors = [
      '.product__description',
      '[class*="description"]',
      '.description',
    ];
    for (const selector of descSelectors) {
      const descEl = $(selector).first();
      if (descEl.length) {
        description = descEl.text().trim().slice(0, 1000);
        if (description) break;
      }
    }

    // Get full page text for parsing details
    const bodyText = $('body').text();

    // Parse ISBN
    const isbnMatch = bodyText.match(/ISBN[:\s]*([0-9\-Xx]+)/i);
    const isbn = isbnMatch ? isbnMatch[1].trim() : null;

    // Parse Publisher
    const publisherMatch = bodyText.match(/Publisher[:\s]*([^\n]+)/i);
    const publisher = publisherMatch
      ? publisherMatch[1].trim().slice(0, 100)
      : null;

    // Parse Publication Date
    const dateMatch = bodyText.match(/Publication Date[:\s]*([^\n]+)/i);
    const publicationDate = dateMatch ? dateMatch[1].trim().slice(0, 50) : null;

    // Parse Format
    const formatMatch = bodyText.match(/Format[:\s]*([^\n]+)/i);
    const format = formatMatch ? formatMatch[1].trim().slice(0, 50) : null;

    // Parse Pages
    const pagesMatch = bodyText.match(/Pages?[:\s]*(\d+)/i);
    const pages = pagesMatch ? parseInt(pagesMatch[1]) : null;

    // Parse Language
    const langMatch = bodyText.match(/Language[:\s]*([A-Za-z]+)/i);
    const language = langMatch ? langMatch[1].trim() : null;

    // Availability
    const availEl = $(
      '[class*="availability"], .stock, [class*="stock"]',
    ).first();
    const availability = availEl.text().trim() || 'In Stock';

    // Get source ID from URL
    const sourceId = url.split('/').pop() ?? 'unknown';

    console.log(`[Scraper] Scraping completed successfully!`);

    return {
      sourceId,
      title,
      author,
      price,
      imageUrl,
      details: {
        description,
        isbn,
        publisher,
        publicationDate,
        format,
        pages,
        language,
        dimensions: null,
        rating: null,
        reviewCount: null,
        availability,
      },
    };
  } catch (error) {
    console.error(`[Scraper] Error scraping ${url}:`, error);
    throw new Error(
      `Scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
