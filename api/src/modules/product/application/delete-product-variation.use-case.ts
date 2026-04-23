import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductVariationRepository } from "../domain/repositories/product-variation.repository";

@Injectable()
export class DeleteProductVariationUseCase {
    constructor(
        @Inject('PRODUCT_VARIATION_REPOSITORY_TOKEN')
        private readonly variationRepository: ProductVariationRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const variation = await this.variationRepository.findById(id);

        if (!variation) {
            throw new NotFoundException('Variation not found');
        }

        await this.variationRepository.delete(id);
    }
}
