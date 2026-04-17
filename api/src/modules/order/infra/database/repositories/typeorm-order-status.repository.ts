import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus as OrderStatusDomain } from "src/modules/order/domain/entities/order-status.entity";
import { OrderStatusRepository } from "src/modules/order/domain/repositories/order-status.repository";
import { OrderStatusEntity } from '../entities/order-status.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmOrderStatusRepository implements OrderStatusRepository {
    constructor(
        @InjectRepository(OrderStatusEntity)
        private readonly ormRepo: Repository<OrderStatusEntity>
    ) { }

    async create(data: OrderStatusDomain): Promise<OrderStatusDomain> {
        const entity = BaseMapper.toPersistence(data.toJSON(), OrderStatusEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderStatusDomain);
    }

    async findByOrderId(orderId: string): Promise<OrderStatusDomain[]> {
        const entities = await this.ormRepo.findBy({ orderId });
        return entities.map(entity => BaseMapper.toDomain(entity, OrderStatusDomain));
    }

    async save(orderStatus: OrderStatusDomain): Promise<OrderStatusDomain> {
        const entity = BaseMapper.toPersistence(orderStatus.toJSON(), OrderStatusEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderStatusDomain);
    }
}
