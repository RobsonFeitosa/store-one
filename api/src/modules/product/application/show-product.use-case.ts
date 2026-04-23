import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from '../domain/repositories/product.repository';
import { Product } from '../domain/entities/product.entity';
import { ProductCategory } from '../domain/entities/product-category.entity';
import type { CategoryRepository } from '../domain/repositories/category.repository';

@Injectable()
export class ShowProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY_TOKEN')
    private readonly productRepository: ProductRepository,

    @Inject('CATEGORY_REPOSITORY_TOKEN')
    private readonly categoriesRepository: CategoryRepository,
  ) { }

  async execute(slug?: string, productId?: string): Promise<Product> {
    let product: Product | null = null;
    const categories: ProductCategory[] = []

    if (productId) {
      product = await this.productRepository.findById(productId);
    } else if (slug) {
      product = await this.productRepository.findByName(slug);
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product) {
      product.categories_items = [];

      if (product.categories) {
        let categoryIds = [];
        try {
          categoryIds = JSON.parse(product.categories);
        } catch (e) {
          categoryIds = [];
        }

        for (const categoryId of categoryIds) {
          const category = await this.categoriesRepository.findById(categoryId);

          if (category) {
            product.categories_items.push(category);
          }
        }
      }
    }

    return product;
  }
}
