import { Inject, Injectable } from "@nestjs/common";
import { ProductAttribute } from "../domain/entities/product-attribute.entity";
import type { ProductAttributeRepository } from "../domain/repositories/product-attribute.repository";

@Injectable()
export class IndexProductAttributesUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private readonly attributeRepository: ProductAttributeRepository,
    ) { }

    async execute(product_id: string): Promise<ProductAttribute[]> {
        return this.attributeRepository.findAllByProduct(product_id);
    }
}
