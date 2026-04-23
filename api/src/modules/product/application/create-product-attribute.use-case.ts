import { Inject, Injectable } from "@nestjs/common";
import { ProductAttribute } from "../domain/entities/product-attribute.entity";
import type { ProductAttributeRepository } from "../domain/repositories/product-attribute.repository";

interface IRequest {
    product_id: string;
    name: string;
    options: any;
}

@Injectable()
export class CreateProductAttributeUseCase {
    constructor(
        @Inject('PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN')
        private readonly attributeRepository: ProductAttributeRepository,
    ) { }

    async execute(data: IRequest): Promise<ProductAttribute> {
        const attribute = new ProductAttribute({
            ...data,
            options: JSON.stringify(data.options)
        });
        return this.attributeRepository.create(attribute);
    }
}
