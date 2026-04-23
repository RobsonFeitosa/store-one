import { Inject, Injectable } from "@nestjs/common";
import { ProductWish } from "../domain/entities/product-wish.entity";
import type { ProductWishRepository } from "../domain/repositories/product-wish.repository";
import PaginationOptionsDTO from "src/shared/domain/helpers/dtos/pagination-opions.dto";

@Injectable()
export class IndexProductWishUseCase {
    constructor(
        @Inject('PRODUCT_WISH_REPOSITORY_TOKEN')
        private readonly wishRepository: ProductWishRepository,
    ) { }

    async execute(options: PaginationOptionsDTO, userId: string): Promise<[ProductWish[], number]> {
        return this.wishRepository.findAndCount(options, userId);
    }
}
