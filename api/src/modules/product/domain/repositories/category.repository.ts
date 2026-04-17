import { Category } from "../entities/category.entity";

export interface CategoryRepository {
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
}
