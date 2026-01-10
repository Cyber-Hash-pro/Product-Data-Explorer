import { Controller, Post, Body } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('product')
  scrapeProduct(@Body('url') url: string) {
    return this.scrapeService.scrapeProduct(url);
  }
}
