import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository
    ) { }

    async execute(productId: string): Promise<void> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        await this.productRepository.delete(productId);
    }
}
