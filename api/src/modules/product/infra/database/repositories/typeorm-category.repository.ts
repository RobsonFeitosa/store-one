import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from "../../../domain/entities/category.entity";
import { CategoryRepository } from "../../../domain/repositories/category.repository";

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepository {
    constructor(
        private readonly ormRepo: Repository<Category>
    ) { }


    async findById(id: string): Promise<Category | null> {
        const entity = await this.ormRepo.findOneBy({ id: Number(id) as any });
        return entity;
    }

    async findAll(): Promise<Category[]> {
        const data = await this.ormRepo.find();
        return data;
    }
}

