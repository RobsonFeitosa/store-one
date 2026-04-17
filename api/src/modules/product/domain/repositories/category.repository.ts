import { Category } from "../entities/category.entity";

export interface CategoryRepository {
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    create(category: Category): Promise<Category>;
    update(category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
    findAndCount(options: { page: number, limit: number }, type?: string): Promise<[Category[], number]>;
}
