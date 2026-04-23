import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductVariation } from "../domain/entities/product-variation.entity";
import type { ProductVariationRepository } from "../domain/repositories/product-variation.repository";
import type { ProductAttributeRepository } from "../domain/repositories/product-attribute.repository";

interface IRequest {
    variationId: string;
    attributeId: string;
    name?: string;
    price?: number;
    quantity?: number;
    time?: string;
    active?: boolean;
    weight?: number;
    dimensions?: any;
    image_id?: string;
    sku?: string;
}

@Injectable()
export class UpdateProductVariationUseCase {
    constructor(
        @Inject('PRODUCT_VARIATION_REPOSITORY_TOKEN')
        private readonly variationRepository: ProductVariationRepository,

        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private readonly attributeRepository: ProductAttributeRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductVariation> {
        const attribute = await this.attributeRepository.findById(data.attributeId);

        if (!attribute) {
            throw new NotFoundException('Attribute not found');
        }

        const variation = await this.variationRepository.findById(data.variationId);

        if (!variation) {
            throw new NotFoundException('Variation not found');
        }

        const { dimensions, ...rest } = data;
        Object.assign(variation, {
            ...rest,
            dimensions: dimensions ? JSON.stringify(dimensions) : variation.dimensions
        });

        return this.variationRepository.save(variation);
    }
}
