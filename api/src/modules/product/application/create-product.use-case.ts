import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Product } from "../domain/entities/product.entity";
import { ProductRepository } from "../domain/repositories/product.repository";
import { ProductDataRepository } from "../domain/repositories/product-data.repository";
import { CategoryRepository } from "../domain/repositories/category.repository";
import { ProductData } from "../domain/entities/product-data.entity";
import { randomUUID } from "crypto";

export interface CreateProductRequest {
    name: string;
    price?: number;
    old_price?: number;
    description?: string;
    short_description?: string;
    categories: string[];
    product_data?: {
        quantity?: number;
        sku?: string;
        weight?: number;
        dimensions?: string;
        code_bar?: string;
    };
}

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('ProductRepository')
        private productRepository: ProductRepository,

        @Inject('ProductDataRepository')
        private productDataRepository: ProductDataRepository,

        @Inject('CategoryRepository')
        private categoryRepository: CategoryRepository,
    ) { }

    public async execute(data: CreateProductRequest): Promise<Product> {
        const { product_data, categories, ...rest } = data;

        const checkProductExist = await this.productRepository.findByName(rest.name);
        if (checkProductExist) {
            throw new BadRequestException('Product item already used.');
        }

        if (rest.old_price && rest.price) {
            if (rest.old_price <= rest.price) {
                throw new BadRequestException('The old price must be greater than the price');
            }
        }

        if (categories) {
            for (const categoryId of categories) {
                const category = await this.categoryRepository.findById(categoryId);
                if (!category) {
                    throw new BadRequestException('Category not found.');
                }
            }
        }

        const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const product = new Product({
            ...rest,
            cod_product: randomUUID(),
            categories: JSON.stringify(categories),
            slug,
        });

        const savedProduct = await this.productRepository.create(product);

        if (product_data) {
            const productData = new ProductData({
                ...product_data,
                product_id: savedProduct.getId(),
            });

            await this.productDataRepository.create(productData);
        }

        return savedProduct;
    }
}
