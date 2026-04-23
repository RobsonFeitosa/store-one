import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Category } from "../../../domain/entities/category.entity";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import PaginationOptionsDTO from 'src/shared/domain/helpers/dtos/pagination-opions.dto';
import { CreateCategoryDto } from '../../http/dtos/create-category.dto';

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepository {
    constructor(
        private readonly ormRepo: Repository<Category>
    ) { }

    public async create(data: CreateCategoryDto): Promise<Category> {
        const categoryCreated = this.ormRepo.create(data)

        await this.ormRepo.save(categoryCreated)

        return categoryCreated
    }

    async findById(id: string): Promise<Category | null> {
        const entity = await this.ormRepo.findOneBy({ id: Number(id) as any });
        return entity;
    }

    async findAll(): Promise<Category[]> {
        const data = await this.ormRepo.find();
        return data;
    }


    public async findByName(name: string): Promise<Category | null> {
        const findCategory = await this.ormRepo.findOne({
            where: {
                name,
            },
        })

        return findCategory
    }


    public async delete(id: string): Promise<void> {
        const category = await this.ormRepo.findOne({
            where: {
                id,
            },
        })

        if (category) {
            this.ormRepo.remove(category)
        }
    }

    public async findAndCount(
        options: PaginationOptionsDTO,
        type: string,
    ): Promise<[Category[], number]> {
        const where = {} as FindOptionsWhere<Category>

        if (type) {
            where.type = type
        }

        const categories = await this.ormRepo.findAndCount({
            take: options.limit,
            skip: (options.page - 1) * options.limit,
            where,
        })

        return categories
    }

    public async update(category: CreateCategoryDto): Promise<Category> {
        const categoryUpdate = await this.ormRepo.save(category)

        return categoryUpdate
    }

    public async save(category: Category): Promise<Category> {
        return this.ormRepo.save(category)
    }
}

