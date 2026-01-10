import { PlaywrightCrawler } from 'crawlee';

export async function scrapeProductPage(url: string) {
  let productData: any = null;

  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 1,
    navigationTimeoutSecs: 90,

    async requestHandler({ page, request, log }) {
      log.info(`Scraping: ${request.url}`);

      // ✅ wait for page
      await page.waitForLoadState('domcontentloaded');

      // ✅ title
      const title = await page.locator('h1').first().innerText();

      // ✅ price (safe)
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

      // ✅ image (safe)
      let imageUrl: string | null = null;
      try {
        imageUrl = await page.locator('img').first().getAttribute('src');
      } catch {
        log.info('Image not found');
      }

      productData = {
        sourceId: request.url.split('/').pop(),
        title,
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
