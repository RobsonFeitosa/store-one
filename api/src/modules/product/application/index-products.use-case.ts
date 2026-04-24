import { Inject, Injectable } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import type { CategoryRepository } from "../domain/repositories/category.repository";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";
import { Product } from "../domain/entities/product.entity";
import { Category } from "../domain/entities/category.entity";
import dayjs from "dayjs";

interface IPaginationOptionsDTO {
    page: number;
    limit: number;
    search?: string;
    user_id?: string;
    onlyDiscount?: boolean;
    type?: 'service' | 'product';
    timeDiscountPriory?: boolean;
    name?: string;
    quantity?: number;
    weight?: number;
    priceMin?: number;
    priceMax?: number;
    lowPrice?: boolean;
    color?: string;
    size?: string;
    highPrice?: boolean;
    old?: boolean;
    alphabeticalASC?: boolean;
    alphabeticalDESC?: boolean;
    categoryId?: string;
    productIds?: string;
}

@Injectable()
export class IndexProductsUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository,
        @Inject('CATEGORY_REPOSITORY_TOKEN')
        private readonly categoryRepository: CategoryRepository,
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(options: IPaginationOptionsDTO): Promise<[Product[], number]> {
        const [products, count] = await this.productRepository.findAll(options);

        for (const product of products) {
            product.categories_items = [];

            if (product.categories) {
                let categoryIds = [];
                try {
                    categoryIds = JSON.parse(product.categories);
                } catch (e) {
                    categoryIds = [];
                }

                for (const categoryId of categoryIds) {
                    const category = await this.categoryRepository.findById(categoryId);

                    if (category) {
                        product.categories_items.push(category);
                    }
                }
            }

            product.wish = null;

            if (product.time_discount && product.time_discount_id) {
                const start = dayjs(product.time_discount.startDate);
                const end = dayjs(product.time_discount.endDate);

                await this.timeDiscountExpired(end.isBefore(start), product);
            }
        }

        return [products, count];
    }

    async timeDiscountExpired(
        isExpired: boolean,
        product: Product,
    ): Promise<void> {
        if (isExpired) {
            product.time_discount = null;

            if (product.time_discount_id) {
                const timeDiscount = await this.timeDiscountRepository.findById(
                    product.time_discount_id,
                );

                if (timeDiscount) {
                    timeDiscount.status = 'expired';

                    await this.timeDiscountRepository.save(timeDiscount);
                }
            }
        }
    }
}
