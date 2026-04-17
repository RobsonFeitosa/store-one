import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order as OrderDomain } from "src/modules/order/domain/entities/order.entity";
import { OrderRepository, PaginationOptions } from "src/modules/order/domain/repositories/order.repository";
import { OrderEntity } from '../entities/order.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly ormRepo: Repository<OrderEntity>
    ) { }

    async create(order: OrderDomain): Promise<OrderDomain> {
        const entity = BaseMapper.toPersistence(order.toJSON(), OrderEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderDomain);
    }

    async findById(id: string): Promise<OrderDomain | null> {
        const entity = await this.ormRepo.findOne({
            where: { id },
            relations: ['orderProducts', 'status']
        });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, OrderDomain);
    }

    async findAndCountByUser(userId: string, options: PaginationOptions): Promise<[OrderDomain[], number]> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            where: { userId },
            take: limit,
            skip,
            order: { createdAt: 'DESC' },
            relations: ['orderProducts', 'status']
        });

        return [data.map(item => BaseMapper.toDomain(item, OrderDomain)), total];
    }

    async findAndCount(options: PaginationOptions): Promise<[OrderDomain[], number]> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { createdAt: 'DESC' },
            relations: ['orderProducts', 'status']
        });

        return [data.map(item => BaseMapper.toDomain(item, OrderDomain)), total];
    }

    async save(order: OrderDomain): Promise<OrderDomain> {
        const entity = BaseMapper.toPersistence(order.toJSON(), OrderEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, OrderDomain);
    }
}
