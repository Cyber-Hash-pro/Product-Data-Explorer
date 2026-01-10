import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct(data: any) {
    return this.prisma.product.create({
      data,
    });
  }
}
