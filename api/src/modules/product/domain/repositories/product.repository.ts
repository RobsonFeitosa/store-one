import { Product } from '../entities/product.entity';

export interface FindAllOptions {
  page?: number;
  limit?: number;
  search?: string;
  user_id?: string;
  onlyDiscount?: boolean;
  type?: 'service' | 'product';
  timeDiscountPriory?: boolean;
  name?: string;
  quantity?: number;
  weight?: number;
  priceMin?: number;
  priceMax?: number;
  lowPrice?: boolean;
  color?: string;
  size?: string;
  highPrice?: boolean;
  old?: boolean;
  alphabeticalASC?: boolean;
  alphabeticalDESC?: boolean;
  categoryId?: string;
  productIds?: string;
}

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByCode(code: string): Promise<Product | null>;
  findAll(options: FindAllOptions): Promise<[Product[], number]>;
  findEmphasis(): Promise<Product | null>;
  delete(id: string): Promise<void>;
  save(product: Product): Promise<Product>;
}
