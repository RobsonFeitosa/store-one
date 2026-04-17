import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct as OrderProductDomain } from "src/modules/order/domain/entities/order-product.entity";
import { OrderProductRepository } from "src/modules/order/domain/repositories/order-product.repository";
import { OrderProductEntity } from '../entities/order-product.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmOrderProductRepository implements OrderProductRepository {
    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly ormRepo: Repository<OrderProductEntity>
    ) { }

    async create(data: OrderProductDomain): Promise<OrderProductDomain> {
        const entity = BaseMapper.toPersistence(data.toJSON(), OrderProductEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderProductDomain);
    }

    async findById(id: string): Promise<OrderProductDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, OrderProductDomain);
    }

    async save(orderProduct: OrderProductDomain): Promise<OrderProductDomain> {
        const entity = BaseMapper.toPersistence(orderProduct.toJSON(), OrderProductEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderProductDomain);
    }
}
