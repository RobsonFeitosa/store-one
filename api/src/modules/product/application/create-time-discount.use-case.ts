import { Inject, Injectable } from "@nestjs/common";
import { TimeDiscount } from "../domain/entities/time-discount.entity";
import type { TimeDiscountRepository } from "../domain/repositories/time-discount.repository";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { CreateTimeDiscountDto } from "../infra/http/dtos/create-time-discount.dto";

@Injectable()
export class CreateTimeDiscountUseCase {
    constructor(
        @Inject('TIME_DISCOUNT_REPOSITORY_TOKEN')
        private readonly timeDiscountRepository: TimeDiscountRepository,

        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(data: CreateTimeDiscountDto): Promise<TimeDiscount> {
        const { productIds, ...rest } = data;

        const timeDiscount = await this.timeDiscountRepository.create({
            ...rest,
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
        });

        for (const productId of productIds) {
            const product = await this.productRepository.findById(productId);

            if (product) {
                product.time_discount = timeDiscount;
                product.time_discount_id = timeDiscount.id;
                await this.productRepository.save(product);
            }
        }

        return timeDiscount;
    }
}
