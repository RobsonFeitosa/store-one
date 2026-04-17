import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product as ProductDomain } from "src/modules/product/domain/entities/product.entity";
import { ProductRepository, FindAllOptions } from "src/modules/product/domain/repositories/product.repository";
import { ProductEntity } from '../entities/product.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly ormRepo: Repository<ProductEntity>
    ) { }

    async create(product: ProductDomain): Promise<ProductDomain> {
        const entity = BaseMapper.toPersistence(product.toJSON(), ProductEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ProductDomain);
    }

    async findById(id: string): Promise<ProductDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, ProductDomain);
    }

    async findByName(name: string): Promise<ProductDomain | null> {
        const entity = await this.ormRepo.findOneBy({ name });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, ProductDomain);
    }

    async findAll(options: FindAllOptions): Promise<[ProductDomain[], number]> {
        const { page = 1, limit = 10, search } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { createdAt: 'DESC' },
            where: search ? [
                { name: ILike(`%${search}%`) },
                { cod_product: ILike(`%${search}%`) }
            ] : undefined,
        });

        const products = data.map(item => BaseMapper.toDomain(item, ProductDomain));
        return [products, total];
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(product: ProductDomain): Promise<ProductDomain> {
        const entity = BaseMapper.toPersistence(product.toJSON(), ProductEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ProductDomain);
    }
}
