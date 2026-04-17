import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category as CategoryDomain } from "src/modules/product/domain/entities/category.entity";
import { CategoryRepository } from "src/modules/product/domain/repositories/category.repository";
import { CategoryEntity } from '../entities/category.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly ormRepo: Repository<CategoryEntity>
    ) { }

    async findById(id: string): Promise<CategoryDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, CategoryDomain);
    }

    async findAll(): Promise<CategoryDomain[]> {
        const data = await this.ormRepo.find();
        return data.map(item => BaseMapper.toDomain(item, CategoryDomain));
    }
}
