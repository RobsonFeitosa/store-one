import PaginationOptionsDTO from "src/shared/domain/helpers/dtos/pagination-opions.dto";
import { Category } from "../entities/category.entity";

export interface CategoryRepository {
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    create(category: Category): Promise<Category>;
    update(category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Category | null>
    findAndCount(options: PaginationOptionsDTO, type?: string): Promise<[Category[], number]>;
    save(category: Category): Promise<Category>
}


