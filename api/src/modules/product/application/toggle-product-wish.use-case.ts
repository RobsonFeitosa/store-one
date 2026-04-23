import { Inject, Injectable } from "@nestjs/common";
import { ProductWish } from "../domain/entities/product-wish.entity";
import type { ProductWishRepository } from "../domain/repositories/product-wish.repository";

interface IRequest {
    product_id: string;
    user_id: string;
}

@Injectable()
export class ToggleProductWishUseCase {
    constructor(
        @Inject('PRODUCT_WISH_REPOSITORY_TOKEN')
        private readonly wishRepository: ProductWishRepository,
    ) { }

    async execute({ product_id, user_id }: IRequest): Promise<ProductWish | void> {
        const checkWish = await this.wishRepository.findByProductAndUser(
            product_id,
            user_id,
        );

        if (!checkWish) {
            return this.wishRepository.create({
                product_id,
                user_id,
            });
        }

        await this.wishRepository.delete(checkWish.id);
    }
}
