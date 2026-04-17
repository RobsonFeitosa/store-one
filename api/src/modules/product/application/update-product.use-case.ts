import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { Product } from "../domain/entities/product.entity";

interface IRequest {
    productId: string;
    name?: string;
    slug?: string;
    description?: string;
    is_active?: boolean;
    manage_stock?: boolean;
    product_type?: string;
}

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository
    ) { }

    async execute(data: IRequest): Promise<Product> {
        const product = await this.productRepository.findById(data.productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (data.name !== undefined) product.name = data.name;
        if (data.slug !== undefined) product.slug = data.slug;
        if (data.description !== undefined) product.description = data.description;

        return this.productRepository.save(product);
    }
}
