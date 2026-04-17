import { Inject, Injectable } from "@nestjs/common";
import type { ProductRepository } from "../domain/repositories/product.repository";
import { Product } from "../domain/entities/product.entity";

interface IPaginationOptionsDTO {
    page: number;
    limit: number;
    search?: string;
}

@Injectable()
export class IndexProductsUseCase {
    constructor(
        @Inject('PRODUCT_REPOSITORY_TOKEN')
        private readonly productRepository: ProductRepository
    ) { }

    async execute(options: IPaginationOptionsDTO): Promise<[Product[], number]> {
        return this.productRepository.findAll(options);
    }
}
