import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ScrapeModule } from './scrape/scrape.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, ProductsModule, ScrapeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
