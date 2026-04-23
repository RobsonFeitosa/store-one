import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";

@Injectable()
export class UpdateRemoveTimeDiscountOfProductUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(productId: string): Promise<void> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        product.time_discount = null;
        product.time_discount_id = null;

        await this.productRepository.save(product);
    }
}
