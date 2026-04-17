import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ProductDataRepository } from "../domain/repositories/product-data.repository";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { ProductData } from "../domain/entities/product-data.entity";

interface IRequest {
    productId: string;
    payload: {
        price?: number;
        sale_price?: number;
        stock_quantity?: number;
        weight?: number;
        length?: number;
        width?: number;
        height?: number;
    }
}

@Injectable()
export class CreateProductDataUseCase {
    constructor(
        @Inject('PRODUCT_DATA_REPOSITORY_TOKEN')
        private readonly productDataRepository: ProductDataRepository,
        
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository
    ) { }

    async execute({ productId, payload }: IRequest): Promise<ProductData> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const productData = new ProductData({
            product_id: productId,
            ...payload
        });

        return this.productDataRepository.create(productData);
    }
}
