import { PlaywrightCrawler } from 'crawlee';

export interface ScrapedProduct {
  sourceId: string;
  title: string;
  author: string | null;
  price: number | null;
  imageUrl: string | null;
}

export async function scrapeProductPage(
  url: string,
): Promise<ScrapedProduct> {
  let productData: ScrapedProduct | null = null;

  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 1,
    navigationTimeoutSecs: 90,

    async requestHandler({ page, request, log }) {
      log.info(`Scraping product page: ${request.url}`);

      // ✅ wait until DOM is ready
      await page.waitForLoadState('domcontentloaded');

      /* ---------------- TITLE ---------------- */
      const rawTitle = await page.locator('h1').first().innerText();
      const title = rawTitle.split('\n')[0].trim();

      /* ---------------- AUTHOR ---------------- */
      let author: string | null = null;

      // Strategy 1: "by Author" in title (fallback)
      if (rawTitle.toLowerCase().includes('by')) {
        const parts = rawTitle.split(/by/i);
        author = parts[1]?.trim() || null;
      }

      // Strategy 2: author link (preferred if exists)
      if (!author) {
        try {
          author = await page
            .locator('a[href*="/collections/authors"]')
            .first()
            .innerText({ timeout: 3000 });
        } catch {
          log.info('Author not found via link selector');
        }
      }

      /* ---------------- PRICE ---------------- */
      let price: number | null = null;
      try {
        const priceText = await page
          .locator('span:has-text("£")')
          .first()
          .innerText({ timeout: 5000 });

        price = Number(priceText.replace(/[^\d.]/g, ''));
      } catch {
        log.info('Price not found, setting as null');
      }

      /* ---------------- IMAGE ---------------- */
      let imageUrl: string | null = null;
      try {
        // Prefer product images, not logo
        imageUrl =
          (await page
            .locator('img[src*="/products/"], img[data-src*="/products/"]')
            .first()
            .getAttribute('src')) ||
          (await page
            .locator('img[data-src*="/products/"]')
            .first()
            .getAttribute('data-src'));
      } catch {
        log.info('Product image not found');
      }

      // normalize protocol-relative URLs
      if (imageUrl?.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }

      /* ---------------- SOURCE ID ---------------- */
      const sourceId = request.url.split('/').pop() ?? 'unknown';

      productData = {
        sourceId,
        title,
        author,
        price,
        imageUrl,
      };
    },
  });

  await crawler.run([url]);

  if (!productData) {
    throw new Error('Scraping failed: no data extracted');
  }

  return productData;
}
