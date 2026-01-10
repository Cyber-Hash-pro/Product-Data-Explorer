import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts() {
    return this.prisma.product.findMany();
  }

async createProduct(data: any) {
  return this.prisma.product.upsert({
    where: { sourceUrl: data.sourceUrl },
    update: {
      title: data.title,
      author: data.author,
      price: data.price,
      imageUrl: data.imageUrl,
    },
    create: data,
  });
}
}
