import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductAttributeRepository } from "../domain/repositories/product-attribute.repository";

@Injectable()
export class DeleteProductAttributeUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private readonly attributeRepository: ProductAttributeRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const attribute = await this.attributeRepository.findById(id);

        if (!attribute) {
            throw new NotFoundException('Attribute not found');
        }

        await this.attributeRepository.delete(id);
    }
}
