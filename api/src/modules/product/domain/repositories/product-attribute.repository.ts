import { ProductAttribute } from "../entities/product-attribute.entity";

export interface ProductAttributeRepository {
    create(data: Partial<ProductAttribute>): Promise<ProductAttribute>;
    findById(id: string): Promise<ProductAttribute | null>;
    findAllByProduct(product_id: string): Promise<ProductAttribute[]>;
    findAllAttributesColors(): Promise<ProductAttribute[]>;
    findAllAttributesSizes(): Promise<ProductAttribute[]>;
    save(attribute: ProductAttribute): Promise<ProductAttribute>;
    delete(id: string): Promise<void>;
}
