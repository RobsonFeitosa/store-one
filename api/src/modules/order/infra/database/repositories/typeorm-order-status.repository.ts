import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderStatus } from "../../../domain/entities/order-status.entity";
import { OrderStatusRepository } from "../../../domain/repositories/order-status.repository";

@Injectable()
export class TypeOrmOrderStatusRepository implements OrderStatusRepository {
    constructor(
        private readonly ormRepo: Repository<OrderStatus>
    ) { }


    async create(data: OrderStatus): Promise<OrderStatus> {
        const saved = await this.ormRepo.save(data);
        return saved;
    }

    async findByOrderId(order_id: string): Promise<OrderStatus[]> {
        const entities = await this.ormRepo.findBy({ order_id });
        return entities;
    }

    async save(orderStatus: OrderStatus): Promise<OrderStatus> {
        const saved = await this.ormRepo.save(orderStatus);
        return saved;
    }
}

