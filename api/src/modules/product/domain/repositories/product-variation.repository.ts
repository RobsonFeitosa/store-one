import { ProductVariation } from "../entities/product-variation.entity";

export interface ProductVariationRepository {
    create(data: Partial<ProductVariation>): Promise<ProductVariation>;
    findById(id: string): Promise<ProductVariation | null>;
    findAllByAttribute(product_attribute_id: string): Promise<ProductVariation[]>;
    save(variation: ProductVariation): Promise<ProductVariation>;
    delete(id: string): Promise<void>;
}
