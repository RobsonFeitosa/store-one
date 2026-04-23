import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductAttribute } from "../domain/entities/product-attribute.entity";
import type { ProductAttributeRepository } from "../domain/repositories/product-attribute.repository";
import type { ProductRepository } from "../domain/repositories/product.repository";

interface IRequest {
    attributeId: string;
    productId: string;
    name: string;
    options: any;
}

@Injectable()
export class UpdateProductAttributeUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private readonly attributeRepository: ProductAttributeRepository,

        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductAttribute> {
        const product = await this.productRepository.findById(data.productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const attribute = await this.attributeRepository.findById(data.attributeId);

        if (!attribute) {
            throw new NotFoundException('Attribute not found');
        }

        attribute.name = data.name;
        attribute.options = JSON.stringify(data.options);

        return this.attributeRepository.save(attribute);
    }
}
