import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";
import { Product } from "../domain/entities/product.entity";
import dayjs from "dayjs";

@Injectable()
export class ShowEmphasisProductUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository,
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,
    ) { }

    async execute(): Promise<Product> {
        const product = await this.productRepository.findEmphasis();

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.time_discount && product.time_discount_id) {
            const start = dayjs(product.time_discount.startDate);
            const end = dayjs(product.time_discount.endDate);

            await this.timeDiscountExpired(end.isBefore(dayjs()), product);
        }

        return product;
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
