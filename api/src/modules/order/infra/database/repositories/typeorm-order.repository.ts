import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from "../../../domain/entities/order.entity";
import type { OrderRepository, PaginationOptions } from "../../../domain/repositories/order.repository";


@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
    constructor(
        private readonly ormRepo: Repository<Order>
    ) { }


    async create(order: Order): Promise<Order> {
        const saved = await this.ormRepo.save(order);
        return saved;
    }

    async findById(id: string): Promise<Order | null> {
        const entity = await this.ormRepo.findOne({
            where: { id },
            relations: ['orderProducts', 'status']
        });
        return entity;
    }

    async findAndCountByUser(user_id: string, options: PaginationOptions): Promise<[Order[], number]> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            where: { user_id },
            take: limit,
            skip,
            order: { created_at: 'DESC' },
            relations: ['orderProducts', 'status']
        });

        return [data, total];
    }

    async findAndCount(options: PaginationOptions): Promise<[Order[], number]> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { created_at: 'DESC' },
            relations: ['orderProducts', 'status']
        });

        return [data, total];
    }

    async save(order: Order): Promise<Order> {
        const saved = await this.ormRepo.save(order);
        return saved;
    }
}

