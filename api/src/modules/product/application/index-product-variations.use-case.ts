import { Inject, Injectable } from "@nestjs/common";
import { ProductVariation } from "../domain/entities/product-variation.entity";
import type { ProductVariationRepository } from "../domain/repositories/product-variation.repository";

@Injectable()
export class IndexProductVariationsUseCase {
    constructor(
        @Inject('PRODUCT_VARIATION_REPOSITORY_TOKEN')
        private readonly variationRepository: ProductVariationRepository,
    ) { }

    async execute(attributeId: string): Promise<ProductVariation[]> {
        return this.variationRepository.findAllByAttribute(attributeId);
    }
}
