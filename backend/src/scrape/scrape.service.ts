import { Injectable } from '@nestjs/common';
import { scrapeProductPage } from './crawlers/product.crawler';
import { ProductService } from '../products/product.service';

@Injectable()
export class ScrapeService {
  constructor(private readonly productService: ProductService) {}

  async scrapeProduct(url: string) {
    const data = await scrapeProductPage(url);

    return this.productService.createProduct({
      sourceId: data.sourceId,
      title: data.title,
      price: data.price,
      imageUrl: data.imageUrl,
      sourceUrl: url,
    });
  }
}
