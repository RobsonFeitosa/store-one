import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { Product } from "../domain/entities/product.entity";

interface IRequest {
    productId: string;
    name?: string;
    slug?: string;
    description?: string;
    short_description?: string;
    is_active?: boolean;
    manage_stock?: boolean;
    product_type?: string;
    type?: string;
    price?: number | string;
    old_price?: number | string;
    categories?: any;
    mode_data?: string;
    time?: string;
    published?: string;
    visibility?: string;
    product_data?: any;
    attributes?: any;
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
        if (data.short_description !== undefined) product.short_description = data.short_description;
        if (data.price !== undefined) product.price = Number(data.price);
        if (data.old_price !== undefined) product.old_price = Number(data.old_price);
        if (data.type !== undefined) product.type = data.type as any;
        if (data.categories !== undefined) product.categories = typeof data.categories === 'string' ? data.categories : JSON.stringify(data.categories);
        if (data.mode_data !== undefined) product.mode_data = data.mode_data;
        if (data.time !== undefined) product.time = data.time;
        if (data.published !== undefined) product.published = data.published;
        if (data.visibility !== undefined) product.visibility = data.visibility;

        // If you need to update product_data, attributes, images, etc., 
        // you would ideally have dedicated repositories or cascade saving.
        // For now, this saves the direct product table fields.

        return this.productRepository.save(product);
    }
}
