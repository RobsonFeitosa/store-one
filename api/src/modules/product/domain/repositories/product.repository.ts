import { Product } from "../entities/product.entity";

export interface FindAllOptions {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByName(name: string): Promise<Product | null>;
    findAll(options: FindAllOptions): Promise<[Product[], number]>;
    delete(id: string): Promise<void>;
    save(product: Product): Promise<Product>;
}
