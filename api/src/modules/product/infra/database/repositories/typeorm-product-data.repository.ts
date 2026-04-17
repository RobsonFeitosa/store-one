import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductData as ProductDataDomain } from "src/modules/product/domain/entities/product-data.entity";
import { ProductDataRepository } from "src/modules/product/domain/repositories/product-data.repository";
import { ProductDataEntity } from '../entities/product-data.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmProductDataRepository implements ProductDataRepository {
    constructor(
        @InjectRepository(ProductDataEntity)
        private readonly ormRepo: Repository<ProductDataEntity>
    ) { }

    async create(data: ProductDataDomain): Promise<ProductDataDomain> {
        const entity = BaseMapper.toPersistence(data.toJSON(), ProductDataEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ProductDataDomain);
    }

    async findByProductId(productId: string): Promise<ProductDataDomain | null> {
        const entity = await this.ormRepo.findOneBy({ productId });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, ProductDataDomain);
    }

    async save(data: ProductDataDomain): Promise<ProductDataDomain> {
        const entity = BaseMapper.toPersistence(data.toJSON(), ProductDataEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ProductDataDomain);
    }
}
