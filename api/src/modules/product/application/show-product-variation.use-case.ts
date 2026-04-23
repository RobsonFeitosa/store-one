import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductVariation } from "../domain/entities/product-variation.entity";
import type { ProductVariationRepository } from "../domain/repositories/product-variation.repository";

@Injectable()
export class ShowProductVariationUseCase {
    constructor(
        @Inject('PRODUCT_VARIATION_REPOSITORY_TOKEN')
        private readonly variationRepository: ProductVariationRepository,
    ) { }

    async execute(id: string): Promise<ProductVariation> {
        const variation = await this.variationRepository.findById(id);

        if (!variation) {
            throw new NotFoundException('Variation not found');
        }

        return variation;
    }
}
