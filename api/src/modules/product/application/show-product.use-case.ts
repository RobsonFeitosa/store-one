import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { Product } from "../domain/entities/product.entity";

@Injectable()
export class ShowProductUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository
    ) { }

    async execute(slug?: string, productId?: string): Promise<Product> {
        let product: Product | null = null;

        if (productId) {
            product = await this.productRepository.findById(productId);
        } else if (slug) {
            // using findByName as a placeholder for slug/search if needed
            product = await this.productRepository.findByName(slug);
        }

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }
}
