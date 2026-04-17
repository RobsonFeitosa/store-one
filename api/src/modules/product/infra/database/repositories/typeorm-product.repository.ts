import { Injectable } from '@nestjs/common';

import { ILike, Repository } from 'typeorm';
import { Product } from "../../../domain/entities/product.entity";
import type { ProductRepository, FindAllOptions } from "../../../domain/repositories/product.repository";


@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
    constructor(
        private readonly ormRepo: Repository<Product>
    ) { }


    async create(product: Product): Promise<Product> {
        const saved = await this.ormRepo.save(product);
        return saved;
    }

    async findById(id: string): Promise<Product | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        return entity;
    }

    async findByName(name: string): Promise<Product | null> {
        const entity = await this.ormRepo.findOneBy({ name });
        return entity;
    }

    async findAll(options: FindAllOptions): Promise<[Product[], number]> {
        const { page = 1, limit = 10, search } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { created_at: 'DESC' },
            where: search ? [
                { name: ILike(`%${search}%`) },
                { cod_product: ILike(`%${search}%`) }
            ] : undefined,
        });

        return [data, total];
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(product: Product): Promise<Product> {
        const saved = await this.ormRepo.save(product);
        return saved;
    }
}

