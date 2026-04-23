import { Inject, Injectable } from "@nestjs/common";
import { ProductVariation } from "../domain/entities/product-variation.entity";
import type { ProductVariationRepository } from "../domain/repositories/product-variation.repository";

interface IRequest {
    attributeId: string;
    name: string;
    price: number;
    quantity?: number;
    time?: string;
    active?: boolean;
    weight?: number;
    dimensions?: any;
    image_id?: string;
    sku?: string;
}

@Injectable()
export class CreateProductVariationUseCase {
    constructor(
        @Inject('PRODUCT_VARIATION_REPOSITORY_TOKEN')
        private readonly variationRepository: ProductVariationRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductVariation> {
        const { attributeId, dimensions, ...rest } = data;
        const variation = new ProductVariation({
            ...rest,
            product_attribute_id: attributeId,
            dimensions: dimensions ? JSON.stringify(dimensions) : undefined
        });
        return this.variationRepository.create(variation);
    }
}
