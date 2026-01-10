import { Injectable } from '@nestjs/common';
import { scrapeProductPage, ScrapedProduct } from './crawlers/product.crawler';
import { ProductService } from '../products/product.service';

@Injectable()
export class ScrapeService {
  constructor(private readonly productService: ProductService) {}

  async scrapeProduct(url: string) {
    const data: ScrapedProduct = await scrapeProductPage(url);

    return this.productService.createProduct({
      sourceId: data.sourceId,
      title: data.title,
      price: data.price ?? 0,
      imageUrl: data.imageUrl,
      sourceUrl: url,
    });
  }
}
