import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(filters: ProductFilters = {}) {
    const {
      search,
      minPrice,
      maxPrice,
      author,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: Prisma.ProductWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        author ? { author: { contains: author, mode: 'insensitive' } } : {},
      ],
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { details: true },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { details: true },
    });
  }

  async createProduct(data: any) {
    const { details, ...productData } = data;

    return this.prisma.product.upsert({
      where: { sourceUrl: data.sourceUrl },
      update: {
        title: productData.title,
        author: productData.author,
        price: productData.price,
        imageUrl: productData.imageUrl,
        details: details
          ? {
              upsert: {
                create: details,
                update: details,
              },
            }
          : undefined,
      },
      create: {
        ...productData,
        details: details
          ? {
              create: details,
            }
          : undefined,
      },
      include: { details: true },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getStats() {
    const [totalProducts, avgPrice, authors] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.aggregate({
        _avg: { price: true },
        _min: { price: true },
        _max: { price: true },
      }),
      this.prisma.product.groupBy({
        by: ['author'],
        _count: true,
        where: { author: { not: null } },
      }),
    ]);

    return {
      totalProducts,
      avgPrice: avgPrice._avg.price || 0,
      minPrice: avgPrice._min.price || 0,
      maxPrice: avgPrice._max.price || 0,
      totalAuthors: authors.length,
    };
  }
}
