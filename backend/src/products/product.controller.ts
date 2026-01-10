import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: Prisma.ProductCreateInput) {
    return this.productService.createProduct(body);
  }

  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }
}
