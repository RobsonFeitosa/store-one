import { ProductProvider } from "../entities/product-provider.entity";

export interface ProductProviderRepository {
    create(data: Partial<ProductProvider>): Promise<ProductProvider>;
    findById(id: string): Promise<ProductProvider | null>;
    findAll(): Promise<ProductProvider[]>;
    save(provider: ProductProvider): Promise<ProductProvider>;
    delete(id: string): Promise<void>;
}
