import { ProductData } from "../entities/product-data.entity";

export interface ProductDataRepository {
    create(data: ProductData): Promise<ProductData>;
    findByProductId(productId: string): Promise<ProductData | null>;
    save(data: ProductData): Promise<ProductData>;
}
