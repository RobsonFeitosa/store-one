import { ProductWish } from "../entities/product-wish.entity";
import PaginationOptionsDTO from "src/shared/domain/helpers/dtos/pagination-opions.dto";

export interface ProductWishRepository {
    create(data: { product_id: string, user_id: string }): Promise<ProductWish>;
    findByProductAndUser(product_id: string, user_id: string): Promise<ProductWish | null>;
    findAndCount(options: PaginationOptionsDTO, user_id: string): Promise<[ProductWish[], number]>;
    delete(id: string): Promise<void>;
}
